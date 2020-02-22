import * as React from "react";
import { throttle } from "throttle-debounce";
import { getScrollTop, getElementTop } from "./scroll";
import "./Subtitle.scss";
interface Props {
  list: string[];
}
interface State {
  top: number;
  sticky: boolean;
  activeIndex: number;
  stickyOffsetTop: number;
}
const TOP = 60;
const getSubtitleEle = () => document.querySelectorAll("#mk-content > h3");
const getBollTop = (subs: any) =>
  subs.offsetTop + (subs.clientHeight - 8) * 0.5;
export default class Subtitle extends React.Component<Props, State> {
  static defaultProps = {
    list: []
  };
  onScroll: Function;
  state: State = {
    top: TOP,
    sticky: false,
    stickyOffsetTop: 0,
    activeIndex: 0
  };
  subTitleRef: HTMLDivElement;
  bollRef: HTMLSpanElement;
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    this.renderSubtitle();
    const updateBall = (activeIndex = 0) => {
      let items = this.subTitleRef.querySelectorAll(".ant-anchor-link");
      if (items.length > 0) {
        const subs = this.subTitleRef.querySelectorAll(".ant-anchor-link")[
          activeIndex
        ];
        // @ts-ignore
        this.updateBollTop(getBollTop(subs));
      }
    };
    // @ts-ignore
    this.onScroll = throttle(30, () => {
      const { pageYOffset: offset } = window;
      this.setState({
        top: Math.max(0, 60 - offset)
      });
      const scrollTop = getScrollTop(window);
      let scrollerRect = {
        top: 60,
        left: 0
      };
      const subtitles = getSubtitleEle();
      const rects = [];
      subtitles.forEach(el => {
        rects.push({
          height: el.clientHeight,
          top: this.getElementTop(el, scrollerRect, window)
        });
      });
      const _activeIndex = this.getActiveAnchorIndex(
        scrollTop,
        rects,
        subtitles
      );
      let { activeIndex } = this.state;
      if (_activeIndex >= 0 && activeIndex != _activeIndex) {
        this.setState(
          {
            activeIndex: _activeIndex
          },
          () => {
            updateBall(_activeIndex);
          }
        );
      }
    });
    // @ts-ignore
    window.addEventListener("scroll", this.onScroll);
    updateBall(0);
  }
  getActiveAnchorIndex = (scrollTop, rects, subtitles) => {
    for (let i = subtitles.length - 1; i >= 0; i--) {
      const prevHeight = i > 0 ? rects[i - 1].height : 0;
      const reachTop = this.state.sticky
        ? prevHeight + this.state.stickyOffsetTop
        : 0;

      if (scrollTop + reachTop >= rects[i].top) {
        return i;
      }
    }
    return -1;
  };

  getElementTop = (ele, scrollerRect, scroller) => {
    const eleRect = ele.getBoundingClientRect();
    return eleRect.top - scrollerRect.top + getScrollTop(scroller);
  };
  //   shouldComponentUpdate(nextProps) {
  //     // return nextProps.list.join("") !== this.props.list.join("");
  //   }
  renderSubtitle = () => {
    const { list } = this.props;
    return list.map(el => el.trim().replace(/###\s*/, ""));
  };
  onClick = (index, id, event) => {
    console.log(event.target);
    this.scrollToElement(index, id);
    this.updateBollTop(getBollTop(event.target));
  };
  updateBollTop = t => {
    this.bollRef.style.top = t + "px";
  };
  scrollToElement = (index, el) => {
    let match,
      items = getSubtitleEle();
    for (let i = 0; i < items.length; i++) {
      if (i === index) {
        match = items[i];
        break;
      }
    }

    if (match) {
      window.scrollTo({
        top: match.offsetTop - 15,
        behavior: "smooth"
      });
      this.setState({
        activeIndex: index
      });
    }
  };

  getActiveBoll = () => {
    const activeEle = this.subTitleRef
      ? this.subTitleRef.querySelector(".ant-anchor-link-active")
      : null;

    // return this.state.activeIndex * H + (H - 8) / 2;
  };
  render() {
    const { list } = this.props;
    return (
      <div className="demo-anchor">
        <div
          className="ant-affix"
          style={{
            position: "fixed",
            top: this.state.top,
            right: 15,
            width: "150px",
            paddingTop: 24
          }}
        >
          <div className="ant-anchor-wrapper">
            <div
              ref={ref => (this.subTitleRef = ref)}
              id="subtitles"
              className="ant-anchor"
            >
              {this.renderSubtitle().map((el, index) => {
                return (
                  <div
                    onClick={e => {
                      this.onClick(index, el, e);
                    }}
                    className={
                      "ant-anchor-link " +
                      (this.state.activeIndex == index
                        ? "ant-anchor-link-active"
                        : "")
                    }
                    key={index}
                  >
                    <a title={el} className="ant-anchor-link-title">
                      {el}
                    </a>
                  </div>
                );
              })}
              <div className="ant-anchor-ink-nav">
                <span
                  className="ant-anchor-ink-ball"
                  ref={ref => (this.bollRef = ref)}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
