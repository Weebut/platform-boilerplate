import axios from 'axios';

interface RegisterUserDto {
  email: string;
  emailVerified?: boolean;
  phoneNumber: string;
  familyName: string;
  givenName: string;
  nickname: string;
}

export async function registerUser(dto: RegisterUserDto) {
  await axios.post('/api/users', dto);
}
