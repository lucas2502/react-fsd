import { fetchUser } from '../src/features/fetch-user/model/fetchUser.usecase';
test('fetchUser returns mock data', async () => {
  const user = await fetchUser('1');
  expect(user.name).toBe('John Doe');
});
