import {SplicingView} from "../draw/SplicingView";

class TextBox {

  calculateText(...lines) {
    var height = 0
    var text = '';
    lines.filter(line => !!line).forEach(line => {
      height += SplicingView.TEXT_HEIGHT;
      text += line + '\n';
    })

    this.text = {
      height: height,
      text: text
    }
  }

}

export {TextBox}
