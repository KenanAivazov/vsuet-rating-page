export default ({ to, from, next, store }, middleware) => {
  const { accessRoles } = middleware;
  const { role } = JSON.parse(localStorage.getItem('userInfo')) || { role: null }

  if ( role ) {
    if ( accessRoles.includes(role) ) {
      console.log('есть доступ')
      return next()
    } else {
      console.log('нету доступа');
      store.commit('UNIQUE', {
        name: 'infDialog',
        data: {
          head: 'Ошибка',
          text: 'Данная страница недоступна вам',
          active: true
        }
      })
    }
  } else {
    return next()
  }
}
