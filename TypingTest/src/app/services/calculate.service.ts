import { Injectable } from '@angular/core';
import { Test, TestStatistics, Word } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  constructor() {}

  calculateTestResult(words: Word[], duration: number, testType: string): Test {
    let testResult: Test = {
      time: new Date().toString(),
      duration: duration,
      type: testType,
      netWPM: 0,
      grossWPM: 0,
      accuracy: 0,
      characters: 0,
      correctCharacters: 0,
      wrongCharacters: 0,
      words: 0,
      correctWords: 0,
      wrongWords: 0,
    };

    for (let word of words) {
      (word.isCorrect || word.isWrong) && ++testResult.words;
      word.isCorrect && ++testResult.correctWords;
      word.isWrong && ++testResult.wrongWords;

      testResult.characters += word.characters;
      testResult.correctCharacters += word.correctCharacters;
      testResult.wrongCharacters += word.wrongCharacters;
    }

    testResult.grossWPM = testResult.characters / (5 * duration);
    testResult.grossWPM = Math.round(testResult.grossWPM);

    testResult.netWPM = testResult.correctCharacters / (5 * duration);
    testResult.netWPM = Math.round(testResult.netWPM);

    testResult.accuracy = (testResult.correctCharacters / testResult.characters) * 100;
    testResult.accuracy = parseFloat(testResult.accuracy.toFixed(2));

    return testResult;
  }

  calculateTestStats(tests: Test[]): TestStatistics {
    let statistics = {
      totalTests: 0,
      averageSpeed: 0,
      averageAccuracy: 0,
      totalCharacters: 0,
      totalWords: 0,
    };

    for (let test of tests) {
      statistics.totalTests++;
      statistics.averageSpeed += test.netWPM;
      statistics.totalWords += test.words;
      statistics.totalCharacters += test.characters;
      statistics.averageAccuracy += test.accuracy;
    }

    statistics.averageSpeed = Math.round(
      statistics.averageSpeed / statistics.totalTests
    );

    statistics.averageAccuracy = parseFloat(
      (statistics.averageAccuracy / statistics.totalTests).toFixed(2)
    );

    return statistics;
  }
}
