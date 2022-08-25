import { firebaseAuth } from '@libs/firebase/client';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(firebaseAuth, provider);
  } catch (error: any) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      alert(
        '같은 이메일로 가입한 계정이 있습니다. 다른 로그인 방식을 선택해주세요.',
      );
    } else if (
      error.code === 'auth/popup-closed-by-user' ||
      error.code === 'auth/cancelled-popup-request'
    ) {
    } else {
      alert(`에러가 발생했습니다.\n\n에러 코드 : ${error.code}`);
    }
  }
}
