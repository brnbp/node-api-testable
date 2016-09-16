import app from './app.js';

app.listen(app.get('port'), () => {
  console.log(`app is running on port ${app.get('port')}`);
});
