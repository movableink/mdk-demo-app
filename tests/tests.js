const container = document.createElement('div');
container.classNames = 'container';
document.body.appendChild(container);

QUnit.module('my-weather', {
  beforeEach: function(assert) {
    container.innerHTML = wysiwygContent();
  },
  afterEach: function(assert) {
    container.innerHTML = '';
  }
});

QUnit.test('an app', function(assert) {
  CD._urlParams = { mi_bar: 'a_value' };

  const app = new MyWeather();

  assert.equal(app.tags.length, 1, 'has a tag');
});
