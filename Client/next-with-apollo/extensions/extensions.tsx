import { ParsedUrlQuery } from "querystring";
import React from "react";


export const addClassName = (e: React.MouseEvent<HTMLElement, MouseEvent> | React.SyntheticEvent<HTMLElement, Event>, className: string, isNotClass?: string) => {
    if (isNotClass) {
        if (!e.currentTarget.classList.contains(isNotClass))
            if (!e.currentTarget.classList.contains(className)) e.currentTarget.classList.add(className);
    }
    else {
        if (!e.currentTarget.classList.contains(className)) e.currentTarget.classList.add(className);
    }
}
export const removeClassName = (e: React.MouseEvent<HTMLElement, MouseEvent> | React.SyntheticEvent<HTMLElement, Event>, className: string) => {
    if (e.currentTarget.classList.contains(className)) e.currentTarget.classList.remove(className);
}
export const toggleClassName = (e: React.MouseEvent<HTMLElement, MouseEvent> | React.SyntheticEvent<HTMLElement, Event>, className: string) => {
    if (e.currentTarget.classList.contains(className)) e.currentTarget.classList.remove(className);
    else e.currentTarget.classList.add(className);
}
export const categoryOnLoad = (e: React.SyntheticEvent<HTMLElement, Event>, pageName: string) => {

    if (e.currentTarget.classList.contains(pageName)) addClassName(e, "selected");

}
export const addClassNameElement = (byName: string, className: string) => {
    const e = document.getElementsByClassName(byName).item(0)
    if (e)
        if (!e.classList.contains(className)) e.classList.add(className);
}
export const removeClassNameElement = (byName: string, className: string) => {
    const e = document.getElementsByClassName(byName).item(0)
    if (e)
        if (e.classList.contains(className)) e.classList.remove(className);
}
export const toggleClassNameElement = (byName: string, className: string) => {
    const e = document.getElementsByClassName(byName).item(0)
    if (e)
        if (e.classList.contains(className)) e.classList.remove(className);
        else e.classList.add(className);
}
export const navMenuActivation = (className: string, menuClassName: string, fullClassName: string) => {
    const e = document.getElementsByClassName(className).item(0)
    if (e) {

        if (e.classList.contains(menuClassName)) {
            e.classList.remove(menuClassName);
            e.classList.add(fullClassName)
        }
        else if (e.classList.contains(fullClassName)) {
            e.classList.remove(fullClassName)
            e.classList.add(menuClassName);
        }
        else {
            e.classList.add(fullClassName)
        }
    }

}
export const resetWindowEnterAnimation = (e: string) => {
    {
        removeClassNameElement(e, "flyUpFromMid");
        removeClassNameElement(e, "flyUpFromBottom");
        removeClassNameElement(e, "flyDownFromMid");
        removeClassNameElement(e, "flyDownFromTop");

    }
}
export const leaveAnimation = (e: string, className: string) => {
    {
        resetWindowEnterAnimation(e)
        addClassNameElement(e, className);
    }
}

export const timedLeaveAnimation = (e: React.MouseEvent<HTMLElement, MouseEvent>, idName: string, pageName: string) => {
    var target = e.currentTarget;
    if (idName !== (pageName + "Link"))
        if (target) {
            Array.from(document.getElementsByClassName("loadingSVG")).forEach((i) => i.classList.add("loadingAnimated"));
            resetWindowEnterAnimation("window");
            addClassNameElement("window", "flyUpFromMid");
            setTimeout(() => {
                addClassNameElement("selected", "navFadeOut");
                removeClassNameElement("selected", "selected");
            }, 500);
            setTimeout(() => {
                document.getElementById(idName)?.click();
            }, 1000);

        }

}

export const urlParams = (query: ParsedUrlQuery, param: string) => query[param];
export const isParams = (query: ParsedUrlQuery, param: string) => query[param] !== undefined;
export const urlSearch = (query:string) => new URLSearchParams(query);
export const setPageMode = (isTrue: boolean) => {
    React.useEffect(() => {
        if (isTrue) {
            addClassNameElement("window", "menuModeWindow");
            addClassNameElement("window", "flyDownFromTop");
            addClassNameElement("menuButton", "is-active");
            removeClassNameElement("nav", "navOut");

            removeClassNameElement("window", "fillInNoAnimation");
            
        }
        else{
            addClassNameElement("window", "fillInNoAnimation");
            addClassNameElement("nav", "navOut");
        }
    });
}