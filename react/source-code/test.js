import render from './react-dom/render';
import createElement from './react-dom';
console.log('22222222')

window.onload = () => {
 
    render(createElement("div", {
        id: "1",
        style: {
            color: 'red'
        }
    }, /*#__PURE__*/createElement("div", null, "22222")), document.getElementById('root'))
}