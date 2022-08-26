import { PostCard } from '@components/cards/post-card.component';
import { SideBarLayout } from '@components/layouts/side-bar-layout.component';
import { Group } from '@components/side-bars/side-bar.component';
import { Strip } from '@components/strips/strip.component';
import { useFirebaseUser } from '@hooks/firebase-user';
import { Box, Stack, Typography } from '@mui/material';

export function MyPageContainer() {
  // Data queried from external service
  const cards = [
    {
      title: '모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.',
      description: `모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.
                  헌법개정은 국회재적의원 과반수 또는 대통령의 발의로
                  제안된다.`,
    },
    {
      title: '모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.',
      description: `모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.
                  헌법개정은 국회재적의원 과반수 또는 대통령의 발의로
                  제안된다.`,
    },
    {
      title: '모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.',
      description: `모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.
                  헌법개정은 국회재적의원 과반수 또는 대통령의 발의로
                  제안된다.`,
    },
    {
      title: '모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.',
      description: `모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.
                  헌법개정은 국회재적의원 과반수 또는 대통령의 발의로
                  제안된다.`,
    },
  ];

  const groups: Group[] = [
    {
      icon: '🔥',
      name: '인기 카테고리',
      tabs: [
        { name: '웹 개발' },
        { name: 'React' },
        { name: 'Python' },
        { name: 'Android' },
      ],
    },
    {
      icon: '🧑‍💻',
      name: '개발',
      tabs: [
        { name: '일반 개발' },
        { name: 'Javascript' },
        { name: 'React' },
        { name: 'Vue.js' },
      ],
    },
  ];

  const { user } = useFirebaseUser();

  return (
    <SideBarLayout groups={groups}>
      <Strip>
        <Box className="flex h-full w-full flex-col py-12">
          <Box>
            <Typography className="text-2xl">안녕하세요,</Typography>
            <Typography className="text-2xl font-bold">
              {user?.email} 님
            </Typography>
          </Box>
        </Box>
      </Strip>
      <Strip>
        <Stack spacing={4} className="flex w-full flex-col">
          <Stack spacing={2} className="flex flex-col">
            <Typography className="text-xl font-bold">
              대기 중인 포스트
            </Typography>
            <Typography className="text-sm">
              포스트 심사 결과는 매주 수요일 발표됩니다
            </Typography>
          </Stack>
          <Box className="flex flex-wrap">
            {cards.map((card, index) => (
              <PostCard key={index} card={card} />
            ))}
          </Box>
        </Stack>
      </Strip>
    </SideBarLayout>
  );
}
