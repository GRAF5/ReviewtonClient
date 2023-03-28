import UserStore from './user.store';

describe('UserStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('should set user', () => {
    userStore.setUser({id: 'id', token: 'token'});
    expect(userStore.user).toStrictEqual({id: 'id', token: 'token'});
    expect(localStorage.getItem('token')).toBe('token');
  });

  test('should clear user data', () => {
    userStore.setUser({id: 'id', token: 'token'});
    userStore.exit();
    expect(userStore.user).toStrictEqual(null);
    expect(localStorage.getItem('token')).toBe(null);
  });

  test('should check access for user', () => {
    userStore.setUser({role: 'user'});
    expect(userStore.checkAccessByRole('user')).toBe(true);
    userStore.setUser({role: 'moderator'});
    expect(userStore.checkAccessByRole('user')).toBe(true);
    userStore.setUser({role: 'admin'});
    expect(userStore.checkAccessByRole('user')).toBe(true);
  });

  test('should check access for moderator', () => {
    userStore.setUser({role: 'user'});
    expect(userStore.checkAccessByRole('moderator')).toBe(false);
    userStore.setUser({role: 'moderator'});
    expect(userStore.checkAccessByRole('moderator')).toBe(true);
    userStore.setUser({role: 'admin'});
    expect(userStore.checkAccessByRole('moderator')).toBe(true);
  });

  test('should check access for admin', () => {
    userStore.setUser({role: 'user'});
    expect(userStore.checkAccessByRole('admin')).toBe(false);
    userStore.setUser({role: 'moderator'});
    expect(userStore.checkAccessByRole('admin')).toBe(false);
    userStore.setUser({role: 'admin'});
    expect(userStore.checkAccessByRole('admin')).toBe(true);
  });

  test('should check access for wrong role', () => {
    userStore.setUser({role: 'user'});
    expect(userStore.checkAccessByRole('wrong')).toBe(false);
  });
});
