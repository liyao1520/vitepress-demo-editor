export const getRandomId = () => Math.random().toString(36).slice(2, 12);
export const isObject = (target: unknown) =>
  typeof target == "object" && target !== null;
export const enhanceCreateVnode = (Vue: any) => {
  return function (type: any, props: any, children: any, ...rest: any[]) {
    if (Array.isArray(children)) {
      children = children.map((vnode) => {
        if (Array.isArray(vnode)) {
          return vnode;
        }
        if (isObject(vnode) && !vnode.__v_isVNode) {
          return Vue.createTextVNode(String(vnode));
        }
        return vnode;
      });
    }
    const vnode = Vue.createVNode(type, props, children, ...rest);
    return vnode;
  };
};
