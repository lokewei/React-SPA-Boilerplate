import React from 'react';
import LeftMenuData from '../constants/leftMenu'

export default class extends React.Component {

  componentDidMount() {
    const iframe = this.refs.iframe;
    /*if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.autoHeight(iframe);
        });
    } else {
      iframe.addEventListener('load', () => {
        this.autoHeight(iframe);
      });
    }*/
    // iframe.contentWindow.document.body.style.overflowY = 'auto';
  }

  autoHeight(iframe) {
    iframe.style.height = Math.max(iframe.contentWindow.document.body.scrollHeight,
      iframe.contentWindow.document.documentElement.scrollHeight, 200) + "px";
  }

  render() {
    const subPath = this.props.params.subPath;
    const path = this.props.location.pathname.split('/').slice(1) || [];
    let currentParts = LeftMenuData;
    let externalUrl = '/404';
    path.forEach((part) => {
      const cpo = currentParts.find((item) => item.key === part);
      if (!cpo) {
        return false;
      }
      externalUrl = cpo.externalUrl;
      currentParts = cpo.children || [];
      return true;
    });
    if(__CONTEXT__){
      externalUrl = __CONTEXT__ + externalUrl;
    }
    const defaultHeight = document.body.clientHeight - 80;
    return <iframe src={externalUrl} ref="iframe" frameBorder="0" style={{ width: '100%', height: defaultHeight }} />
  }
}
