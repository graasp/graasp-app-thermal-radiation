import { LOCAL_API_HOST } from './api';

export const DEFAULT_LANG = 'en';
export const DEFAULT_MODE = 'student';

// avoid breaking the app in production when embedded in different contexts
let defaultApiHost;
try {
  defaultApiHost =
    window.parent.location.hostname === 'localhost' ? LOCAL_API_HOST : null;
} catch (e) {
  console.error(e);
  defaultApiHost = null;
}

export const DEFAULT_API_HOST = defaultApiHost;

// we haven't decided what to call the teacher mode

export const MODES = {
  TEACHER: 'teacher',
  STUDENT: 'student',
  PRODUCER: 'producer',
  EDUCATOR: 'educator',
  ADMIN: 'admin',
  CONSUMER: 'consumer',
  LEARNER: 'learner',
};
export const TEACHER_MODES = [
  MODES.TEACHER,
  MODES.PRODUCER,
  MODES.EDUCATOR,
  MODES.ADMIN,
];
export const STUDENT_MODES = [MODES.STUDENT, MODES.CONSUMER, MODES.LEARNER];

export const DEFAULT_VISIBILITY = 'private';
export const PUBLIC_VISIBILITY = 'public';
