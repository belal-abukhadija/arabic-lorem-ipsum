import { generateText, formatOutput, generateArabicLoremIpsum } from '../lib/textGenerator';

describe('Arabic Text Generator', () => {
  describe('generateText', () => {
    it('should generate the correct number of paragraphs', () => {
      const result = generateText({
        type: 'paragraphs',
        count: 3,
        format: 'plain',
        theme: 'general',
        includePunctuation: true,
        preventRepetition: true,
      });

      expect(result.metadata.paragraphCount).toBeGreaterThanOrEqual(3);
      expect(result.text).toBeTruthy();
      expect(result.text.length).toBeGreaterThan(0);
    });

    it('should generate the correct number of sentences', () => {
      const result = generateText({
        type: 'sentences',
        count: 5,
        format: 'plain',
        theme: 'general',
        includePunctuation: true,
        preventRepetition: true,
      });

      expect(result.metadata.sentenceCount).toBe(5);
      expect(result.text).toBeTruthy();
    });

    it('should generate approximately the correct number of words', () => {
      const result = generateText({
        type: 'words',
        count: 50,
        format: 'plain',
        theme: 'general',
        includePunctuation: false,
        preventRepetition: true,
      });

      expect(result.metadata.wordCount).toBe(50);
    });

    it('should generate the correct number of characters', () => {
      const result = generateText({
        type: 'characters',
        count: 100,
        format: 'plain',
        theme: 'general',
        includePunctuation: false,
        preventRepetition: true,
      });

      expect(result.metadata.characterCount).toBe(100);
    });

    it('should include custom keywords', () => {
      const customKeywords = ['اختبار', 'تطوير'];
      const result = generateText({
        type: 'sentences',
        count: 10,
        format: 'plain',
        theme: 'general',
        includePunctuation: true,
        preventRepetition: true,
        customKeywords,
      });

      // At least one of the custom keywords should appear
      const hasKeyword = customKeywords.some(keyword => result.text.includes(keyword));
      expect(hasKeyword).toBe(true);
    });

    it('should start with classic Lorem Ipsum when requested', () => {
      const result = generateText({
        type: 'sentences',
        count: 3,
        format: 'plain',
        theme: 'general',
        includePunctuation: true,
        preventRepetition: true,
        startWithClassic: true,
      });

      expect(result.text).toContain('Lorem ipsum');
    });

    it('should respect theme selection', () => {
      const techResult = generateText({
        type: 'words',
        count: 50,
        format: 'plain',
        theme: 'technology',
        includePunctuation: false,
        preventRepetition: true,
      });

      expect(techResult.metadata.theme).toBe('technology');
      expect(techResult.text).toBeTruthy();
    });
  });

  describe('formatOutput', () => {
    it('should format as plain text', () => {
      const result = generateText({
        type: 'sentences',
        count: 2,
        format: 'plain',
        theme: 'general',
        includePunctuation: true,
        preventRepetition: true,
      });

      const formatted = formatOutput(result, 'plain', 'sentences');
      expect(typeof formatted).toBe('string');
      expect(formatted).toBe(result.text);
    });

    it('should format as HTML with RTL support', () => {
      const result = generateText({
        type: 'paragraphs',
        count: 2,
        format: 'html',
        theme: 'general',
        includePunctuation: true,
        preventRepetition: true,
      });

      const formatted = formatOutput(result, 'html', 'paragraphs');
      expect(formatted).toContain('<p dir="rtl"');
      expect(formatted).toContain('class="arabic-text"');
    });

    it('should format as JSON', () => {
      const result = generateText({
        type: 'sentences',
        count: 2,
        format: 'json',
        theme: 'general',
        includePunctuation: true,
        preventRepetition: true,
      });

      const formatted = formatOutput(result, 'json', 'sentences');
      const parsed = JSON.parse(formatted);
      
      expect(parsed.text).toBeTruthy();
      expect(parsed.metadata).toBeTruthy();
      expect(parsed.direction).toBe('rtl');
      expect(parsed.language).toBe('ar');
    });

    it('should format as Markdown', () => {
      const result = generateText({
        type: 'paragraphs',
        count: 2,
        format: 'markdown',
        theme: 'general',
        includePunctuation: true,
        preventRepetition: true,
      });

      const formatted = formatOutput(result, 'markdown', 'paragraphs');
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe('string');
    });
  });

  describe('generateArabicLoremIpsum', () => {
    it('should return both formatted text and result metadata', () => {
      const { formatted, result } = generateArabicLoremIpsum({
        type: 'sentences',
        count: 3,
        format: 'plain',
        theme: 'general',
        includePunctuation: true,
        preventRepetition: true,
      });

      expect(formatted).toBeTruthy();
      expect(result.text).toBeTruthy();
      expect(result.metadata).toBeTruthy();
      expect(result.metadata.sentenceCount).toBe(3);
    });
  });

  describe('Edge cases', () => {
    it('should handle very large word counts', () => {
      const result = generateText({
        type: 'words',
        count: 500,
        format: 'plain',
        theme: 'general',
        includePunctuation: false,
        preventRepetition: true,
      });

      expect(result.metadata.wordCount).toBe(500);
    });

    it('should handle minimum counts', () => {
      const result = generateText({
        type: 'paragraphs',
        count: 1,
        format: 'plain',
        theme: 'general',
        includePunctuation: true,
        preventRepetition: true,
      });

      expect(result.text).toBeTruthy();
      expect(result.text.length).toBeGreaterThan(0);
    });

    it('should prevent repetition when enabled', () => {
      const result = generateText({
        type: 'sentences',
        count: 10,
        format: 'plain',
        theme: 'general',
        includePunctuation: true,
        preventRepetition: true,
      });

      const words = result.text.split(' ');
      for (let i = 1; i < words.length; i++) {
        expect(words[i]).not.toBe(words[i - 1]);
      }
    });
  });
});
