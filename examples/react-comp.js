const e = React.createElement;
const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);

function reactcomp() {
  class LikeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {liked: false};
    }

    componentDidMount() {
      performance.mark('testmarker end');
      msgDone();
    }

    render() {
      if (this.state.liked) {
        return 'You liked this.';
      }

      return e('button', {onClick: () => this.setState({liked: true})}, 'Like');
    }
  }
  root.render(e(LikeButton));
}
