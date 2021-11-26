import render from './react-dom/render';
import createElement from './create-element';
window.onload = () => {

    render(createElement("div", {
        id: "1",
        style: {
            color: 'red'
        }
    }, createElement("div", null, `window.name的值是${window.name}`), createElement("div", null, "3333")), document.getElementById('root'))

}