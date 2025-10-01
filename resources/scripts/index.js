const helloJs = eById('HelloJs');
const JsPageContainer = eById('JsPageContainer');
const HelloVideo = eById('HelloVideo');
//const HelloVideoContent = eById('HelloVideoContent');

const JsMenuBarContainer = eById('JsMenuBarContainer');
const JsMenuBar = eById('JsMenuBar');
const JsMenuBarBlur = eById('JsMenuBarBlur');
const JsMenuBarMagnifier = eById('JsMenuBarMagnifier');
const JsMenuBarColor = eById('JsMenuBarColor');

const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

const JsAppDetailCloseButton = eById('JsAppDetailCloseButton');
const JsAppDetailView = eById('JsAppDetailView');
const JsAppDetailBackground = eById('JsAppDetailBackground');
const JsAppItems = document.querySelectorAll('.JsAppItem');


function showJsAppDetailView(titleElem, descriptionElem, iconElem, previewElem, linkElems) {
    eById('JsAppDetailTitle').innerText = titleElem.innerText;
    eById('JsAppDetailDescription').innerHTML = descriptionElem.innerHTML;
    eById('JsAppDetailIconContainer').innerHTML = iconElem.outerHTML;
    const previewContainer = eById('JsAppDetailPreviewImagesContainer');
    if (previewElem == null) {
        previewContainer.innerHTML = `No Images Available for ${titleElem.innerText}.`;
    } else {
        previewContainer.innerHTML = previewElem.innerHTML;
        const imageElements = previewContainer.getElementsByTagName('img');
        Array.from(imageElements).forEach(img => {
            img.addEventListener('click', function () {
                // Copy image element
                const tempImageElem = img.cloneNode();
                tempImageElem.classList.add('JsAppDetailPreviewImageEnlarged');
                document.body.appendChild(tempImageElem);
                setTimeout(() => {
                    tempImageElem.classList.add('show');
                }, 10);
                tempImageElem.addEventListener('click', function () {
                    tempImageElem.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(tempImageElem);
                    }, 300);
                })
            });
        });
    }
    const JsAppDetailLinkContainer = eById('JsAppDetailLinkContainer');
    JsAppDetailLinkContainer.innerHTML = '';
    if (linkElems) {
        for (let i = 0; i < linkElems.length; i++) {
            const a = document.createElement('a');
            a.href = linkElems[i].href;
            a.target = '_blank';
            a.innerText = linkElems[i].innerText;
            JsAppDetailLinkContainer.appendChild(a);
        }
    }
    JsAppDetailView.style.display = 'flex';
    JsAppDetailBackground.style.display = 'block';
    setTimeout(function () {
        JsAppDetailView.classList.add('show');
        JsAppDetailBackground.classList.add('show');
    }, 10);
}
function hideJsAppDetailView() {
    JsAppDetailView.classList.remove('show');
    JsAppDetailBackground.classList.remove('show');
    setTimeout(function () {
        JsAppDetailView.style.display = 'none';
        JsAppDetailBackground.style.display = 'none';
    }, 300);
}
JsAppDetailBackground.addEventListener('click', function () {
    hideJsAppDetailView();
});
JsAppDetailCloseButton.addEventListener('click', function () {
    hideJsAppDetailView();
});
JsAppItems.forEach(item => {
    item.addEventListener('click', function () {
        showJsAppDetailView(
            item.querySelector('.JsAppTitle'),
            item.querySelector('.JsAppDescription'),
            item.querySelector('picture'),
            item.querySelector('.JsAppDetailPreviewImagesContainer'),
            item.querySelectorAll('.JsAppLink')
        );
    });
});

const JsFontLicenseButton = eById('JsFontLicenseButton');
const JsFontLicenseContent = eById('JsFontLicenseContent');
JsFontLicenseButton.addEventListener('click', function () {
    showJsAppDetailView(
        JsFontLicenseContent.querySelector('.JsAppTitle'),
        JsFontLicenseContent.querySelector('.JsAppDescription'),
        JsFontLicenseContent.querySelector('picture'),
        null,
        []
    );
});

function calcOptimalGradientStep() {
    return Math.floor(0.4 * remInPx);
}
function drawGradientBlur(targetElem, destElem, position = "top", amount = 25) {
    const elementHeight = Math.floor(targetElem.offsetHeight * 1.5);
    const stepHeightPx = calcOptimalGradientStep();
    const steps = Math.max(1, Math.floor(elementHeight / stepHeightPx));
    const fragment = document.createDocumentFragment();
    const d = 2 * amount / (steps * (steps + 1));

    console.log(`Drawing gradient blur with ${steps} steps, each ${stepHeightPx}px.`);
    for (let i = 1; i <= steps; i++) {
        const stepDiv = document.createElement('div');

        const currentHeight = i * stepHeightPx;

        const blurValue = (steps - i + 1) * d;
        stepDiv.setAttribute('style', `${position === 'top' ? 'top: 0;' : 'bottom: 0;'} height: ${currentHeight}px; backdrop-filter: blur(${blurValue}px); -webkit-backdrop-filter: blur(${blurValue}px);`);
        stepDiv.style.pointerEvents = 'none';

        fragment.appendChild(stepDiv);
    }

    const container = document.createElement('div');
    container.style.top = position === 'top' ? '0' : 'auto';
    container.style.bottom = position === 'bottom' ? '0' : 'auto';
    container.style.height = `${elementHeight}px`;
    container.appendChild(fragment);
    destElem.appendChild(container);
}

/*
// Removed to fix scroll behavior.
function setMainMargin() {
    const viewportHeight = window.innerHeight;
    const mainJs = document.getElementById('MainJs');
    mainJs.style.marginTop = `${viewportHeight - 6 * remInPx}px`;
}
*/

var isThrottling = false;
function eventThrottle(func, time) {
    if (isThrottling) return;
    isThrottling = true;
    setTimeout(() => {
        func();
        console.log(`Throttled event executed after ${time}ms`);
        isThrottling = false;
    }, time);
}
var maxBlur = 20;
var containerHeight = window.innerHeight;
var isScrollProcessing = false;
function scrollEventHandler() {
    const scrollY = window.scrollY;
    if (!isScrollProcessing) {
        window.requestAnimationFrame(() => {
            isScrollProcessing = true;
            if (scrollY >= containerHeight * 0.95) {
                JsPageContainer.style.backgroundColor = 'var(--SecondaryBackground)';
                //HelloVideoContent.pause();
                JsMenuBarBlurBottom.style.display = 'none';
            } else {
                //HelloVideoContent.play();
                JsPageContainer.style.backgroundColor = 'var(--BlurBackground)';
                JsMenuBarBlurBottom.style.display = 'block';
            }
            if (scrollY > containerHeight) {
                JsMenuBarBlurTop.style.display = 'block';
            } else {
                JsMenuBarBlurTop.style.display = 'none';
            }
            isScrollProcessing = false;
        });
        isScrollProcessing = true;
    }
}
window.addEventListener('resize', function () {
    //setMainMargin();
});
window.addEventListener('scroll', function () {
    eventThrottle(scrollEventHandler, 300);
});
document.addEventListener('DOMContentLoaded', function () {
    drawGradientBlur(JsMenuBarContainer, JsMenuBarBlurTop);
    drawGradientBlur(JsMenuBarContainer, JsMenuBarBlurBottom, 'bottom');
    //setMainMargin();
    scrollEventHandler();
    setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth'; // Fix for iOS WebKit refresh bug
    }, 100);
});

var isMoving = false;
var mouseMoveTimeout;
var isMouseMoveProcessing = false;
document.addEventListener('mousemove', function (event) {
    if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout);
    }
    if (!JsMenuBarContainer.contains(event.target)) {
        const currentTransform = JsMenuBarMagnifier.style.transform || '';
        // Remove any scale(...) part, keep translateX
        const translateMatch = currentTransform.match(/translateX\([^)]+\)/);
        JsMenuBarMagnifier.style.transform = translateMatch ? translateMatch[0] : '';
        // Hide mask when not hovering
        JsMenuBarColor.style.setProperty('--mask-x', '-100%');
        JsMenuBarColor.style.setProperty('--mask-y', '-100%');
        isMoving = false;
        return;
    }
    if (!isMouseMoveProcessing) {
        window.requestAnimationFrame(() => {
            isMouseMoveProcessing = true;
            isMoving = true;
            mouseMoveTimeout = setTimeout(() => {
                if (!isMoving) return;
                if (mouseMoveTimeout) {
                    clearTimeout(mouseMoveTimeout);
                }
                isMoving = false;
                // mouse move end, move to nearest menu item's center
                const menuItems = JsMenuBarContainer.querySelectorAll('a');
                let nearestItem = null;
                let nearestDistance = Infinity;
                menuItems.forEach(item => {
                    const rect = item.getBoundingClientRect();
                    const itemCenterX = rect.left + rect.width / 2;
                    const distance = Math.abs(event.clientX - itemCenterX);
                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        nearestItem = item;
                    }
                });
                if (nearestItem) {
                    const rect = nearestItem.getBoundingClientRect();
                    const itemCenterX = rect.left + rect.width / 2;

                    const translateX = itemCenterX - JsMenuBarMagnifier.offsetWidth / 2 - JsMenuBarContainer.getBoundingClientRect().left;
                    setTimeout(() => {
                        JsMenuBarMagnifier.style.transform = `translateX(${translateX}px)`;
                    }, 50);
                } else {
                    JsMenuBarMagnifier.style.transform = '';
                }
            }, 200);

            const barRect = JsMenuBar.getBoundingClientRect();
            const containerRect = JsMenuBarContainer.getBoundingClientRect();
            const magnifierWidth = JsMenuBarMagnifier.offsetWidth;

            let translateX = event.clientX - containerRect.left - magnifierWidth / 2;
            
            const minX = barRect.left - containerRect.left; 
            const maxX = barRect.right - containerRect.left - magnifierWidth;
            translateX = Math.max(minX, Math.min(translateX, maxX));

            if (isMoving) {
                JsMenuBarMagnifier.style.transform = `translateX(${translateX}px) scale(1.4, 1.2)`;
            } else {
                JsMenuBarMagnifier.style.transform = `translateX(${translateX}px)`;
            }

            // Get magnifier's actual rect after transform
            const magnifierRect = JsMenuBarMagnifier.getBoundingClientRect();
            
            // Update mask position - only X coordinate follows mouse, Y stays centered
            const maskX = ((event.clientX - barRect.left) / barRect.width) * 100;
            JsMenuBarColor.style.setProperty('--mask-x', `${Math.max(0, Math.min(100, maskX))}%`);
            
            // Set mask size larger than magnifier for better coverage with gradient
            const maskRadius = magnifierRect.width * 0.7;
            JsMenuBarColor.style.setProperty('--mask-height', `${maskRadius}px`);
            isMouseMoveProcessing = false;
        });
        isMouseMoveProcessing = true;
    }
});

eById("LanguageSelect").addEventListener("change", function () {
    const selectedLang = this.value;
    if (selectedLang === 'ko') {
        window.location.href = './index.html';
    } else if (selectedLang === 'en') {
        window.location.href = './index_en.html';
    }
});
/*
// on menu bar click, scale to 1.2 and back to 1.0 after 100ms
JsMenuBarContainer.addEventListener('click', function () {
    JsMenuBarMagnifier.style.transform = 'scale(1.2)';
    setTimeout(() => {
        JsMenuBarMagnifier.style.transform = 'scale(1)';
    }, 100);
});*/