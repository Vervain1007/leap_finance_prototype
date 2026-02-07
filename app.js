/**
 * IELTS Prep Prototype - Leap Scholar
 * Interactive gamified engagement flow
 */

document.addEventListener('DOMContentLoaded', () => {

// State
const state = {
  targetScore: 7.0,
  dailyMinutes: 10,
  currentQuestion: 0,
  correctCount: 0,
  timerInterval: null,
  timeRemaining: 600, // 10 min in seconds
  quizComplete: false
};

// Sample IELTS Reading questions
const quizQuestions = [
  {
    question: "According to the passage, the main purpose of the IELTS exam is to:",
    options: ["assess English language proficiency for academic or immigration purposes", "provide entertainment for language learners", "replace university entrance exams entirely", "test only speaking and writing skills"],
    correct: 0,
    explanation: "IELTS evaluates your ability to use English in academic or general contexts."
  },
  {
    question: "The passage suggests that regular practice is important because:",
    options: ["it builds confidence and familiarity with the test format", "it guarantees a high score", "other students do it", "the exam changes every week"],
    correct: 0,
    explanation: "Consistent practice helps you become familiar with the format and builds skills."
  },
  {
    question: "What does the author recommend for improving Reading skills?",
    options: ["Skim and scan techniques", "Reading only fiction", "Avoiding timed practice", "Focusing on one passage type"],
    correct: 0,
    explanation: "Skimming and scanning are key techniques for the IELTS Reading section."
  },
  {
    question: "The Listening section typically lasts approximately:",
    options: ["30 minutes", "60 minutes", "90 minutes", "15 minutes"],
    correct: 0,
    explanation: "The Listening test is about 30 minutes long, plus 10 minutes to transfer answers."
  },
  {
    question: "Band scores in IELTS range from:",
    options: ["0 to 9", "1 to 10", "A to F", "0 to 100"],
    correct: 0,
    explanation: "IELTS uses a 9-band scale to report scores."
  },
  {
    question: "Which skill is NOT tested in the IELTS Academic exam?",
    options: ["Mathematics", "Reading", "Writing", "Speaking"],
    correct: 0,
    explanation: "IELTS tests Listening, Reading, Writing, and Speaking—not math."
  },
  {
    question: "The Writing Task 2 essay should be at least:",
    options: ["250 words", "150 words", "500 words", "100 words"],
    correct: 0,
    explanation: "Task 2 requires a minimum of 250 words."
  },
  {
    question: "In the Speaking test, Part 2 requires you to:",
    options: ["Speak for 1-2 minutes on a given topic", "Have a group discussion", "Write answers only", "Listen to a recording"],
    correct: 0,
    explanation: "You get a topic card and have 1-2 minutes to speak after 1 minute preparation."
  }
];

// DOM refs
const screens = {
  onboarding: document.getElementById('screen-onboarding'),
  dashboard: document.getElementById('screen-dashboard'),
  task: document.getElementById('screen-task'),
  reward: document.getElementById('screen-reward'),
  leaderboard: document.getElementById('screen-leaderboard'),
  weeklyReview: document.getElementById('screen-weekly-review'),
  roadmap: document.getElementById('screen-roadmap')
};

// Navigation
function showScreen(screenId) {
  Object.values(screens).forEach(s => s?.classList.remove('active'));
  const screen = screens[screenId] || document.getElementById(`screen-${screenId}`);
  if (screen) screen.classList.add('active');
}

// Onboarding
document.querySelectorAll('.score-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.score-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.targetScore = parseFloat(btn.dataset.score);
  });
});

document.querySelectorAll('.time-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.dailyMinutes = parseInt(btn.dataset.minutes, 10);
  });
});

document.getElementById('onboarding-complete')?.addEventListener('click', () => {
  showScreen('dashboard');
});

// Dashboard → Task
document.getElementById('start-task')?.addEventListener('click', () => {
  resetQuiz();
  startQuiz();
  showScreen('task');
});

// Back buttons
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.screen;
    if (target) showScreen(target);
  });
});

// Task play buttons
document.querySelectorAll('.task-play-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const taskCard = btn.closest('.task-card');
    const taskType = taskCard?.dataset.task;
    console.log('Task play clicked:', taskType);
    
    if (taskType === 'tictactoe') {
      window.location.href = 'tic-tac-toe.html';
    } else if (taskType === 'quiz') {
      resetQuiz();
      startQuiz();
      showScreen('task');
    }
  });
});

// Nav buttons (Leaderboard, Weekly Review, Roadmap)
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.screen;
    if (target) showScreen(target);
  });
});

// Quiz logic
function resetQuiz() {
  state.currentQuestion = 0;
  state.correctCount = 0;
  state.quizComplete = false;
  state.timeRemaining = state.dailyMinutes * 60;
  if (state.timerInterval) clearInterval(state.timerInterval);
}

function startQuiz() {
  renderQuestion();
  startTimer();
}

function startTimer() {
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.timeRemaining--;
    updateTimerDisplay();
    if (state.timeRemaining <= 0) {
      clearInterval(state.timerInterval);
      finishQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = document.getElementById('quiz-timer');
  if (!el) return;
  const m = Math.floor(state.timeRemaining / 60);
  const s = state.timeRemaining % 60;
  el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

function renderQuestion() {
  const q = quizQuestions[state.currentQuestion];
  if (!q) {
    finishQuiz();
    return;
  }

  document.getElementById('current-q').textContent = state.currentQuestion + 1;
  document.getElementById('total-q').textContent = quizQuestions.length;
  document.getElementById('question-text').textContent = q.question;

  const optionsEl = document.getElementById('options');
  optionsEl.innerHTML = q.options.map((opt, i) =>
    `<button class="option-btn" data-index="${i}">${opt}</button>`
  ).join('');

  document.getElementById('next-question').disabled = true;

  optionsEl.querySelectorAll('.option-btn').forEach(opt => {
    opt.addEventListener('click', () => handleAnswer(opt, q));
  });
}

function handleAnswer(optBtn, q) {
  const chosen = parseInt(optBtn.dataset.index, 10);
  const options = document.querySelectorAll('.option-btn');
  options.forEach(o => o.disabled = true);

  optBtn.classList.add('selected');
  const correctIdx = q.correct;

  if (chosen === correctIdx) {
    state.correctCount++;
    optBtn.classList.add('correct');
    showFeedback('✓', 'Correct! 🎉', q.explanation, true);
  } else {
    optBtn.classList.add('wrong');
    options[correctIdx].classList.add('correct');
    showFeedback('💡', 'Not quite!', q.explanation, false);
  }

  document.getElementById('next-question').disabled = false;
}

function showFeedback(emoji, text, explanation, isCorrect) {
  const overlay = document.getElementById('feedback-overlay');
  document.getElementById('feedback-emoji').textContent = emoji;
  document.getElementById('feedback-text').textContent = text;
  document.getElementById('feedback-explanation').textContent = explanation;
  overlay?.classList.add('visible');
}

function hideFeedback() {
  document.getElementById('feedback-overlay')?.classList.remove('visible');
}

function advanceQuestion() {
  hideFeedback();
  state.currentQuestion++;
  if (state.currentQuestion >= quizQuestions.length) {
    finishQuiz();
  } else {
    renderQuestion();
  }
}

document.getElementById('next-question')?.addEventListener('click', advanceQuestion);
document.getElementById('feedback-continue')?.addEventListener('click', advanceQuestion);

function finishQuiz() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  state.quizComplete = true;

  // Calculate points (approx 10–15 per correct + bonus)
  const points = state.correctCount * 12 + Math.min(20, state.timeRemaining / 30);
  document.getElementById('points-earned').textContent = `+${Math.round(points)}`;

  showScreen('reward');
}

document.getElementById('reward-continue')?.addEventListener('click', () => {
  showScreen('dashboard');
});

});
