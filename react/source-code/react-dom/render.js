
//  更新真实dom的属性
const updateDomProps = () => {

}


const dealWithChildren = (children, parentContainer) => {
    children.forEach(child => {
        changVdomToRealdom(child, parentContainer)
    })
}

const createDom = (vdom) => {
    let dom;
    const { type, props } = vdom;
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        dom = document.createTextNode(vdom);
    } else {
        dom = document.createElement(type);
    }
    if (props) {
        const { children } = props;
        updateDomProps(props, dom);
        if (Array.isArray(children)) {
            dealWithChildren(children, dom)
        } else {
            changVdomToRealdom(children, dom)
        }

    }
    return dom

}
const changVdomToRealdom = (vdom, container) => {
    const dom = createDom(vdom);
    container.appendChild(dom);
}

const render = (vdom, container) => {
    changVdomToRealdom(vdom, container);

};

export default render;