export default function sideMenuOptions (user) { 
  return [
    {text: 'Нові відгуки', path: '/'},
    {text: 'Підписки', path: '/subscriptions', requireAuth: true},
    {text: 'Додати відгук', path: '/add-article'},
    {text: 'Акаунт', path: `/users/${user?.id}`, requireAuth: true},
    // {text: 'Повідомлення', path: '/account//add-article', requireAuth: true},
    // {text: 'Мої статті', path: '/account//articles', requireAuth: true},
    {text: 'Теми', path: '/subjects'},
    {text: 'Теги', path: '/tags'},
    {text: 'Модерація ⇵', open: false, childs: [
      {text: 'Користувачі', path: '/moderate/users'},
      {text: 'Статті', path: '/moderate/articles'},
      {text: 'Коментарі', path: '/moderate/comments'}
    ], requireAuth: true, requireRole: 'moderator'},
    {text: 'Адміністрування ⇵', open: false, childs: [
      {text: 'Користувачі', path: '/administrate/users'},
      {text: 'Теми', path: '/administrate/subjects'},
      {text: 'Теги', path: '/administrate/tags'}
    ], requireAuth: true, requireRole: 'admin'}
  ];
}
