import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { Test, Word } from '../models/models';
import { CalculateService } from '../services/calculate.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-test-box',
  templateUrl: './test-box.component.html',
  styleUrls: ['./test-box.component.css'],
})
export class TestBoxComponent implements OnInit, OnChanges {
  @Input() duration: number = 0;
  @Input() testType: 'simple' | 'advanced' = 'simple';
  @ViewChildren('wordRef') wordsRef?: QueryList<ElementRef>;
  @ViewChild('visibleArea') visibleArea?: ElementRef;

  words: Word[] = [];
  inputField: FormControl;
  currentWord: Word;
  previousInput: string = '';
  wordsBoxPosition: string = '0px';
  isFirstInput: boolean = true;
  counter?: Subscription;
  counterTime: number = 0;
  wordsBoxDisplay: string = 'block';
  msgBoxDisplay: string = 'none';
  loginErrorBoxDisplay: string = 'none';
  resultBoxDisplay: string = 'none';
  testResult?: Test;

  constructor(
    private calculatorService: CalculateService,
    private navigationService: NavigationService
  ) {
    this.inputField = new FormControl('');
    this.currentWord = new Word(-1, '');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.startTest();
  }

  ngOnInit(): void {
    this.startTest();
    this.inputField.valueChanges.subscribe((newValue) => {
      this.runTypingTestAlgorithm(newValue);
    });
  }

  startTest() {
    this.setWords();
    this.counterTime = this.duration * 60;
    // this.counterTime = 5;
    this.inputField.enable();
    this.inputField.setValue('');
    this.resultBoxDisplay = 'none';
    this.wordsBoxDisplay = 'block';
    this.msgBoxDisplay = 'none';
    this.isFirstInput = true;
    this.counter?.unsubscribe();
  }

  setWords() {
    this.words = [];
    this.navigationService.getWords(this.testType).subscribe((res: any) => {
      let tempWords: string[] = [];
      for (let k in res) {
        for (let word of res[k]) {
          tempWords.push(word);
        }
      }

      for (let i = 0; i < 500; i++) {
        this.words.push(
          new Word(i, tempWords[Math.floor(Math.random() * tempWords.length)])
        );
      }

      this.currentWord = this.words[0];
      this.currentWord.isCurrent = true;
    });
  }

  runTypingTestAlgorithm(newInput: string) {
    if (this.isFirstInput) {
      // Perform all the initial Operations, and make it False
      this.counter = timer(1000, 1000).subscribe((res) => {
        --this.counterTime;

        if (this.counterTime === 0) {
          this.counter?.unsubscribe();
          this.inputField.setValue('');
          this.inputField.disable();
          this.wordsBoxDisplay = 'none';
          this.msgBoxDisplay = 'flex';
          this.testOver();
        }
      });

      this.isFirstInput = false;
    }

    let isBackSpace: boolean =
      newInput.length === this.previousInput.length - 1;

    if (newInput.length !== 0) {
      if (this.endsWithSpace(newInput)) {
        // Remove the Last Space
        let trimmedInput = newInput.trimRight();
        ++this.currentWord.characters;
        ++this.currentWord.correctCharacters;

        // Check whether entire word is correct or not
        if (this.currentWord.value === trimmedInput) {
          this.currentWord.isCorrect = true;
          this.currentWord.isWrong = false;
        } else {
          this.currentWord.isCorrect = false;
          this.currentWord.isWrong = true;
        }

        // Go to Next Word
        this.currentWord.isCurrent = false;
        this.currentWord.isCurrentWrong = false;
        this.currentWord = this.words[this.currentWord.index + 1];
        this.currentWord.isCurrent = true;

        // Check whether the next word is on next line or not
        // If it is, then move the wordsBox element up.
        let currentWordPosition = this.wordsRef
          ?.get(this.currentWord.index)
          ?.nativeElement.getBoundingClientRect();

        let visibleAreaPosition =
          this.visibleArea?.nativeElement.getBoundingClientRect();

        if (currentWordPosition.top - visibleAreaPosition.top > 20) {
          this.wordsBoxPosition =
            parseInt(this.wordsBoxPosition) - 50 + 'px'.toString();
        }

        // Set the Input Value to Blank
        this.inputField.setValue('');
      }

      if (!this.endsWithSpace(newInput)) {
        // Check whether Current Word is same Till the Input Word
        let isCurrentWordTillInputSame: boolean =
          this.currentWord.value.length >= newInput.length
            ? this.currentWord.value.slice(0, newInput.length) === newInput
            : false;

        if (isCurrentWordTillInputSame) {
          // Highlight CW Correct
          this.currentWord.isCurrent = true;
          this.currentWord.isCurrentWrong = false;
        } else {
          // Highlight CW Wrong
          this.currentWord.isCurrent = false;
          this.currentWord.isCurrentWrong = true;
        }

        // Check whether Current Character entered is correct or not
        let isCurrentCharacterCorrect =
          this.currentWord.value.length >= newInput.length
            ? newInput.charAt(newInput.length - 1) ===
              this.currentWord.value.charAt(newInput.length - 1)
            : false;

        if (!isBackSpace) {
          // Increment only if it is not a BackSpace
          if (isCurrentCharacterCorrect) {
            ++this.currentWord.characters;
            ++this.currentWord.correctCharacters;
          } else {
            ++this.currentWord.characters;
            ++this.currentWord.wrongCharacters;
          }
        }
      }
    } else {
      this.currentWord.isCurrent = true;
      this.currentWord.isCurrentWrong = false;
    }
    this.previousInput = newInput;
  }

  endsWithSpace(str: string): boolean {
    return str.charAt(str.length - 1) === ' ' ? true : false;
  }

  testOver() {
    // Get all the typed words inside another words array.
    let typedWords: Word[] = [];
    for (let word of this.words) {
      if (
        word.index < this.currentWord.index ||
        (word.index === this.currentWord.index && word.characters > 0)
      ) {
        typedWords.push(word);
      }
    }

    // Calculate the Test Result
    this.testResult = this.calculatorService.calculateTestResult(
      typedWords,
      this.duration,
      this.testType
    );

    // Save the Test Result Only if User is Logged In
    if (this.navigationService.isLoggedIn()) {
      const user = JSON.parse(this.navigationService.getUser());

      this.testResult.userId = user.userId;

      this.navigationService.saveTest(this.testResult).subscribe((res) => {
        // Display the Test Result
        this.resultBoxDisplay = 'block';
        this.loginErrorBoxDisplay = 'none';
      });
    } else {
      this.resultBoxDisplay = 'block';
      this.loginErrorBoxDisplay = 'block';
    }
  }
}
