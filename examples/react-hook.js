const e = React.createElement;
const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);

function reacthook() {
  function LikeButton() {
    const [liked, setLiked] = React.useState(false);

    React.useLayoutEffect(() => {
      performance.mark('testmarker end');
      msgDone();
    }, []);

    if (liked) {
      return 'You liked this.';
    }

    return e('button', {onClick: () => setLiked(true)}, 'Like');
  }

  root.render(e(LikeButton));
}
