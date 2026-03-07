/**
 * Arabic Text Generation Engine
 * 
 * This module provides comprehensive Arabic lorem ipsum text generation
 * with realistic grammar structures, theme-based vocabularies, and
 * extensive customization options.
 */

export type OutputFormat = 'plain' | 'html' | 'json' | 'markdown';
export type GenerationType = 'paragraphs' | 'sentences' | 'words' | 'characters';
export type Theme = 'general' | 'technology' | 'ui' | 'design' | 'content' | 'business' | 'mixed';

export interface GenerationOptions {
  type: GenerationType;
  count: number;
  format: OutputFormat;
  theme: Theme;
  includePunctuation: boolean;
  preventRepetition: boolean;
  customKeywords?: string[];
  startWithClassic?: boolean;
  language?: 'ar' | 'en' | 'mixed';
  minWordsPerSentence?: number;
  maxWordsPerSentence?: number;
}

export interface GenerationResult {
  text: string;
  metadata: {
    wordCount: number;
    characterCount: number;
    sentenceCount: number;
    paragraphCount: number;
    theme: Theme;
    format: OutputFormat;
  };
}

/**
 * Arabic word pools organized by grammatical function and theme
 */
const ARABIC_WORDS = {
  // Common nouns - General
  nouns: {
    general: [
      'النظام', 'البرنامج', 'التطبيق', 'المشروع', 'الخدمة', 'المنتج', 'الحل',
      'العملية', 'الطريقة', 'الأسلوب', 'المحتوى', 'البيانات', 'المعلومات',
      'التقرير', 'الوثيقة', 'الملف', 'المجلد', 'القائمة', 'الجدول', 'النموذج',
      'الصفحة', 'الموقع', 'المنصة', 'القسم', 'الفئة', 'المجموعة', 'العنصر',
      'الخيار', 'الإعداد', 'التكوين', 'الميزة', 'الوظيفة', 'الأداة', 'الموارد'
    ],
    technology: [
      'الخادم', 'قاعدة البيانات', 'واجهة برمجة التطبيقات', 'الكود', 'الخوارزمية',
      'البنية التحتية', 'السحابة', 'الشبكة', 'البروتوكول', 'التشفير', 'الأمان',
      'المستخدم', 'الجلسة', 'الرمز المميز', 'التخزين', 'الذاكرة', 'المعالج',
      'التطبيق', 'الإطار', 'المكتبة', 'الوحدة', 'المكون', 'الخدمة المصغرة',
      'واجهة المستخدم', 'تجربة المستخدم', 'الأداء', 'التحليلات', 'المراقبة'
    ],
    ui: [
      'الزر', 'القائمة', 'النافذة', 'المربع', 'الحقل', 'النموذج', 'الشريط',
      'اللوحة', 'البطاقة', 'الرمز', 'الصورة', 'الفيديو', 'الصوت', 'الرابط',
      'التنقل', 'الشعار', 'العنوان', 'الوصف', 'التسمية', 'العنصر النائب',
      'الأيقونة', 'الشريط الجانبي', 'التذييل', 'الرأس', 'المحتوى الرئيسي'
    ],
    design: [
      'التصميم', 'التخطيط', 'النمط', 'القالب', 'الثيم', 'اللون', 'الخط',
      'المسافة', 'الهامش', 'الحشوة', 'الحدود', 'الظل', 'التدرج', 'الشفافية',
      'الحجم', 'الموضع', 'المحاذاة', 'العرض', 'الارتفاع', 'النسبة', 'الشبكة'
    ],
    business: [
      'العميل', 'الشركة', 'المؤسسة', 'الفريق', 'الموظف', 'المدير', 'القسم',
      'الميزانية', 'التكلفة', 'الإيرادات', 'الربح', 'الاستثمار', 'السوق',
      'الاستراتيجية', 'الخطة', 'الهدف', 'الأداء', 'النتيجة', 'التقييم'
    ],
    content: [
      'المقالة', 'المدونة', 'النص', 'العنوان', 'الفقرة', 'الجملة', 'الكلمة',
      'المحتوى', 'المواد', 'الموضوع', 'الفكرة', 'الرسالة', 'القصة', 'السرد',
      'التعليق', 'المراجعة', 'الوصف', 'الملخص', 'المقدمة', 'الخاتمة'
    ]
  },
  
  // Verbs - present and past tense
  verbs: [
    'يعمل', 'يقوم', 'يساعد', 'يوفر', 'يقدم', 'ينشئ', 'يطور', 'يحسن',
    'يدير', 'ينظم', 'يحلل', 'يعالج', 'يحول', 'يرسل', 'يستقبل', 'يعرض',
    'يحفظ', 'يحمل', 'يرفع', 'ينزل', 'يحذف', 'يضيف', 'يعدل', 'يحدث',
    'يتيح', 'يمكن', 'يسمح', 'يدعم', 'يحتوي', 'يشمل', 'يتضمن', 'يربط'
  ],
  
  // Adjectives
  adjectives: [
    'جديد', 'قديم', 'كبير', 'صغير', 'سريع', 'بطيء', 'قوي', 'ضعيف',
    'مهم', 'أساسي', 'ثانوي', 'رئيسي', 'فرعي', 'عام', 'خاص', 'محدد',
    'واضح', 'غامض', 'بسيط', 'معقد', 'سهل', 'صعب', 'متقدم', 'أساسي',
    'شامل', 'محدود', 'كامل', 'جزئي', 'نشط', 'غير نشط', 'متاح', 'محجوز'
  ],
  
  // Prepositions and particles
  particles: [
    'في', 'على', 'إلى', 'من', 'عن', 'مع', 'ل', 'ب', 'عند', 'لدى',
    'حول', 'خلال', 'قبل', 'بعد', 'أمام', 'خلف', 'تحت', 'فوق', 'بين', 'ضمن'
  ],
  
  // Conjunctions
  conjunctions: [
    'و', 'أو', 'لكن', 'ثم', 'لذلك', 'كما', 'إذا', 'عندما', 'بينما', 'حيث'
  ],
  
  // Common phrases and expressions
  phrases: [
    'بشكل فعال', 'بطريقة سهلة', 'في الوقت الفعلي', 'بشكل تلقائي',
    'بكل سهولة', 'في غضون ثوانٍ', 'بدقة عالية', 'بأمان تام',
    'بسرعة فائقة', 'بكفاءة عالية', 'بشكل موثوق', 'بطريقة احترافية'
  ]
};

/**
 * Classic Lorem Ipsum starter text
 */
const LOREM_IPSUM_CLASSIC = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

/**
 * Get words for a specific theme
 */
function getThemeWords(theme: Theme): string[] {
  if (theme === 'mixed' || theme === 'general') {
    return [
      ...ARABIC_WORDS.nouns.general,
      ...ARABIC_WORDS.nouns.technology.slice(0, 10),
      ...ARABIC_WORDS.nouns.ui.slice(0, 10),
      ...ARABIC_WORDS.nouns.business.slice(0, 10)
    ];
  }
  
  return ARABIC_WORDS.nouns[theme] || ARABIC_WORDS.nouns.general;
}

/**
 * Generate a random Arabic sentence with realistic grammar structure
 */
function generateArabicSentence(
  theme: Theme,
  customKeywords: string[] = [],
  minWords: number = 5,
  maxWords: number = 15
): string {
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words: string[] = [];
  
  const themeNouns = getThemeWords(theme);
  const allNouns = [...themeNouns, ...customKeywords];
  const { verbs, adjectives, particles, conjunctions, phrases } = ARABIC_WORDS;
  
  // Start with a subject (noun)
  words.push(allNouns[Math.floor(Math.random() * allNouns.length)]);
  
  for (let i = 1; i < wordCount; i++) {
    const rand = Math.random();
    
    if (i === 1 && rand < 0.6) {
      // Add verb after first noun
      words.push(verbs[Math.floor(Math.random() * verbs.length)]);
    } else if (rand < 0.3) {
      // Add noun
      words.push(allNouns[Math.floor(Math.random() * allNouns.length)]);
    } else if (rand < 0.5) {
      // Add adjective
      words.push(adjectives[Math.floor(Math.random() * adjectives.length)]);
    } else if (rand < 0.7) {
      // Add particle
      words.push(particles[Math.floor(Math.random() * particles.length)]);
    } else if (rand < 0.85) {
      // Add verb
      words.push(verbs[Math.floor(Math.random() * verbs.length)]);
    } else if (rand < 0.95 && i < wordCount - 2) {
      // Add conjunction
      words.push(conjunctions[Math.floor(Math.random() * conjunctions.length)]);
    } else if (rand < 1.0 && i > 3) {
      // Add phrase
      words.push(phrases[Math.floor(Math.random() * phrases.length)]);
    } else {
      words.push(allNouns[Math.floor(Math.random() * allNouns.length)]);
    }
  }
  
  return words.join(' ');
}

/**
 * Remove duplicate consecutive words
 */
function removeDuplicates(text: string): string {
  const words = text.split(' ');
  const filtered = words.filter((word, index) => {
    if (index === 0) return true;
    return word !== words[index - 1];
  });
  return filtered.join(' ');
}

/**
 * Generate text based on options
 */
export function generateText(options: GenerationOptions): GenerationResult {
  const {
    type,
    count,
    theme,
    includePunctuation,
    preventRepetition,
    customKeywords = [],
    startWithClassic = false,
    minWordsPerSentence = 5,
    maxWordsPerSentence = 15
  } = options;
  
  let sentences: string[] = [];
  
  // Add classic lorem ipsum if requested
  if (startWithClassic) {
    sentences.push(LOREM_IPSUM_CLASSIC);
  }
  
  switch (type) {
    case 'paragraphs': {
      // Generate paragraphs (each with 3-7 sentences)
      for (let p = 0; p < count; p++) {
        const sentencesPerParagraph = Math.floor(Math.random() * 5) + 3;
        for (let s = 0; s < sentencesPerParagraph; s++) {
          let sentence = generateArabicSentence(theme, customKeywords, minWordsPerSentence, maxWordsPerSentence);
          if (includePunctuation) {
            sentence += '.';
          }
          sentences.push(sentence);
        }
      }
      break;
    }
    
    case 'sentences': {
      for (let i = 0; i < count; i++) {
        let sentence = generateArabicSentence(theme, customKeywords, minWordsPerSentence, maxWordsPerSentence);
        if (includePunctuation) {
          sentence += '.';
        }
        sentences.push(sentence);
      }
      break;
    }
    
    case 'words': {
      const themeNouns = getThemeWords(theme);
      const allWords = [
        ...themeNouns,
        ...ARABIC_WORDS.verbs,
        ...ARABIC_WORDS.adjectives,
        ...customKeywords
      ];
      
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        words.push(allWords[Math.floor(Math.random() * allWords.length)]);
      }
      sentences = [words.join(' ')];
      break;
    }
    
    case 'characters': {
      let text = '';
      while (text.length < count) {
        text += generateArabicSentence(theme, customKeywords, minWordsPerSentence, maxWordsPerSentence) + ' ';
      }
      sentences = [text.substring(0, count)];
      break;
    }
  }
  
  let finalText = sentences.join(' ');
  
  if (preventRepetition) {
    finalText = removeDuplicates(finalText);
  }
  
  // Calculate metadata
  const wordCount = finalText.split(/\s+/).filter(w => w.length > 0).length;
  const characterCount = finalText.length;
  const sentenceCount = sentences.length;
  const paragraphCount = type === 'paragraphs' ? count : Math.ceil(sentenceCount / 5);
  
  return {
    text: finalText,
    metadata: {
      wordCount,
      characterCount,
      sentenceCount,
      paragraphCount,
      theme,
      format: options.format
    }
  };
}

/**
 * Format generated text based on output format
 */
export function formatOutput(result: GenerationResult, format: OutputFormat, type: GenerationType): string {
  const { text } = result;
  
  switch (format) {
    case 'html': {
      if (type === 'paragraphs') {
        // Split into paragraphs and wrap in <p> tags
        const sentences = text.split('.');
        const paragraphs: string[] = [];
        let currentParagraph: string[] = [];
        
        sentences.forEach((sentence, index) => {
          if (sentence.trim()) {
            currentParagraph.push(sentence.trim());
            if ((index + 1) % 5 === 0 || index === sentences.length - 1) {
              paragraphs.push(`<p dir="rtl" class="arabic-text">${currentParagraph.join('. ')}.</p>`);
              currentParagraph = [];
            }
          }
        });
        
        return paragraphs.join('\n');
      }
      return `<div dir="rtl" class="arabic-text">${text}</div>`;
    }
    
    case 'json': {
      return JSON.stringify({
        text,
        metadata: result.metadata,
        direction: 'rtl',
        language: 'ar'
      }, null, 2);
    }
    
    case 'markdown': {
      if (type === 'paragraphs') {
        const sentences = text.split('.');
        const paragraphs: string[] = [];
        let currentParagraph: string[] = [];
        
        sentences.forEach((sentence, index) => {
          if (sentence.trim()) {
            currentParagraph.push(sentence.trim());
            if ((index + 1) % 5 === 0 || index === sentences.length - 1) {
              paragraphs.push(currentParagraph.join('. ') + '.');
              currentParagraph = [];
            }
          }
        });
        
        return paragraphs.join('\n\n');
      }
      return text;
    }
    
    case 'plain':
    default:
      return text;
  }
}

/**
 * Main generation function that combines generation and formatting
 */
export function generateArabicLoremIpsum(options: GenerationOptions): { formatted: string; result: GenerationResult } {
  const result = generateText(options);
  const formatted = formatOutput(result, options.format, options.type);
  
  return { formatted, result };
}
