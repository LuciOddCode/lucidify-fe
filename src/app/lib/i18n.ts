import { Language } from "./types";

export const translations = {
  en: {
    // Form labels
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",

    // Navigation
    welcomeBack: "Welcome Back!",
    createAccount: "Create Your Account",
    enterCredentials: "Enter your credentials to login",
    fillDetails: "Fill in your details to get started",
    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    forgotPassword: "Forgot password?",
    rememberMe: "Remember me",

    // Validation messages
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    passwordRequired: "Password is required",
    passwordTooShort: "Password must be at least 8 characters long",
    passwordUppercase: "Password must contain at least one uppercase letter",
    passwordLowercase: "Password must contain at least one lowercase letter",
    passwordNumber: "Password must contain at least one number",
    passwordSpecial: "Password must contain at least one special character",
    confirmPasswordRequired: "Please confirm your password",
    passwordMismatch: "Passwords do not match",

    // API messages
    loginSuccess: "Login successful",
    signupSuccess: "Account created successfully",
    invalidCredentials: "Invalid email or password",
    emailExists: "Email already exists",
    serverError: "Something went wrong. Please try again.",
    networkError: "Network error. Please check your connection.",

    // Loading states
    signingIn: "Signing in...",
    signingUp: "Creating account...",
    loading: "Loading...",
  },
  si: {
    // Form labels
    email: "විද්‍යුත් තැපෑල",
    password: "මුරපදය",
    confirmPassword: "මුරපදය තහවුරු කරන්න",
    signIn: "පිවිසෙන්න",
    signUp: "ලියාපදිංචි වන්න",
    signOut: "ඉවත් වන්න",

    // Navigation
    welcomeBack: "ආයුබෝවන්!",
    createAccount: "ඔබගේ ගිණුම සාදන්න",
    enterCredentials: "පිවිසීමට ඔබගේ තොරතුරු ඇතුළත් කරන්න",
    fillDetails: "ආරම්භ කිරීමට ඔබගේ විස්තර පුරවන්න",
    haveAccount: "දැනටමත් ගිණුමක් තිබේද?",
    noAccount: "ගිණුමක් නැද්ද?",
    forgotPassword: "මුරපදය අමතකද?",
    rememberMe: "මතක තබාගන්න",

    // Validation messages
    emailRequired: "විද්‍යුත් තැපෑල අවශ්‍යයි",
    emailInvalid: "වලංගු විද්‍යුත් තැපැල් ලිපිනයක් ඇතුළත් කරන්න",
    passwordRequired: "මුරපදය අවශ්‍යයි",
    passwordTooShort: "මුරපදය අවම වශයෙන් අක්ෂර 8ක් තිබිය යුතුයි",
    passwordUppercase: "මුරපදයේ අවම වශයෙන් එක් ලොකු අකුරක් තිබිය යුතුයි",
    passwordLowercase: "මුරපදයේ අවම වශයෙන් එක් කුඩා අකුරක් තිබිය යුතුයි",
    passwordNumber: "මුරපදයේ අවම වශයෙන් එක් අංකයක් තිබිය යුතුයි",
    passwordSpecial: "මුරපදයේ අවම වශයෙන් එක් විශේෂ අක්ෂරයක් තිබිය යුතුයි",
    confirmPasswordRequired: "කරුණාකර ඔබගේ මුරපදය තහවුරු කරන්න",
    passwordMismatch: "මුරපද නොගැලපේ",

    // API messages
    loginSuccess: "පිවිසීම සාර්ථකයි",
    signupSuccess: "ගිණුම සාර්ථකව සාදන ලදී",
    invalidCredentials: "වැරදි විද්‍යුත් තැපෑල හෝ මුරපදය",
    emailExists: "විද්‍යුත් තැපෑල දැනටමත් භාවිතයේ",
    serverError: "යමක් වැරදී ගොස් ඇත. කරුණාකර නැවත උත්සාහ කරන්න.",
    networkError: "ජාල දෝෂයක්. කරුණාකර ඔබගේ සම්බන්ධතාවය පරීක්ෂා කරන්න.",

    // Loading states
    signingIn: "පිවිසෙමින්...",
    signingUp: "ගිණුම සාදමින්...",
    loading: "පූරණය වෙමින්...",
  },
  ta: {
    // Form labels
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    signIn: "உள்நுழை",
    signUp: "பதிவு செய்க",
    signOut: "வெளியேறு",

    // Navigation
    welcomeBack: "மீண்டும் வரவேற்கிறோம்!",
    createAccount: "உங்கள் கணக்கை உருவாக்கவும்",
    enterCredentials: "உள்நுழைய உங்கள் விவரங்களை உள்ளிடவும்",
    fillDetails: "தொடங்க உங்கள் விவரங்களை நிரப்பவும்",
    haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    noAccount: "கணக்கு இல்லையா?",
    forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
    rememberMe: "என்னை நினைவில் கொள்ளவும்",

    // Validation messages
    emailRequired: "மின்னஞ்சல் தேவை",
    emailInvalid: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்",
    passwordRequired: "கடவுச்சொல் தேவை",
    passwordTooShort: "கடவுச்சொல் குறைந்தது 8 எழுத்துகள் இருக்க வேண்டும்",
    passwordUppercase:
      "கடவுச்சொல்லில் குறைந்தது ஒரு பெரிய எழுத்து இருக்க வேண்டும்",
    passwordLowercase:
      "கடவுச்சொல்லில் குறைந்தது ஒரு சிறிய எழுத்து இருக்க வேண்டும்",
    passwordNumber: "கடவுச்சொல்லில் குறைந்தது ஒரு எண் இருக்க வேண்டும்",
    passwordSpecial:
      "கடவுச்சொல்லில் குறைந்தது ஒரு சிறப்பு எழுத்து இருக்க வேண்டும்",
    confirmPasswordRequired: "தயவுசெய்து உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    passwordMismatch: "கடவுச்சொற்கள் பொருந்தவில்லை",

    // API messages
    loginSuccess: "உள்நுழைவு வெற்றிகரமாக",
    signupSuccess: "கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது",
    invalidCredentials: "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்",
    emailExists: "மின்னஞ்சல் ஏற்கனவே உள்ளது",
    serverError: "ஏதோ தவறு நடந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
    networkError: "நெட்வொர்க் பிழை. உங்கள் இணைப்பைச் சரிபார்க்கவும்.",

    // Loading states
    signingIn: "உள்நுழைகிறது...",
    signingUp: "கணக்கை உருவாக்குகிறது...",
    loading: "ஏற்றுகிறது...",
  },
};

export const getTranslation = (
  language: Language,
  key: keyof typeof translations.en
): string => {
  return translations[language][key] || translations.en[key];
};

export const getValidationMessage = (
  language: Language,
  error: string
): string => {
  const messageMap: Record<string, keyof typeof translations.en> = {
    "Email is required": "emailRequired",
    "Please enter a valid email address": "emailInvalid",
    "Password is required": "passwordRequired",
    "Password must be at least 8 characters long": "passwordTooShort",
    "Password must contain at least one uppercase letter": "passwordUppercase",
    "Password must contain at least one lowercase letter": "passwordLowercase",
    "Password must contain at least one number": "passwordNumber",
    "Password must contain at least one special character": "passwordSpecial",
    "Please confirm your password": "confirmPasswordRequired",
    "Passwords do not match": "passwordMismatch",
  };

  const translationKey = messageMap[error];
  return translationKey ? getTranslation(language, translationKey) : error;
};
