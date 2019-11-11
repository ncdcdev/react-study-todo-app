import { animateScroll } from 'react-scroll';

export default id => {
  animateScroll.scrollToBottom({
    duration: 0,
    delay: 0,
    smooth: 'easeInOutQuint',
    containerId: id,
  });
};
