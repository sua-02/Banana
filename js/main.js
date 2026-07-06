gsap.registerPlugin(ScrollTrigger);

// Header Scroll
window.addEventListener('scroll', () => {
    document.querySelector('#header').classList.toggle('scrolled', window.scrollY > 50);
});

// Intro (바나나 드랍 + 텍스트 + 스크롤 아이콘)
window.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();
    tl.to("#textFirst", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .set("#banana", { visibility: "visible" }, "-=0.2")
        .from("#banana", { y: -1000, duration: 1.4, ease: "bounce.out" }, "-=0.1")
        .to("#textSecond", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .to("#scrollGuide", { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
});

// Scroll Guide disappear
gsap.to("#scrollGuide", {
    scrollTrigger: { trigger: ".hero-section", start: "top top", end: "10% top", scrub: 1 },
    opacity: 0, y: -10
});

// Statement
gsap.to("#statementText", { scrollTrigger: { trigger: ".statement-section", start: "top 80%" }, opacity: 1, y: 0, duration: 1.2 });

// Nutrition (이미지 선등장 시차)
gsap.utils.toArray('.nutrition-item').forEach((item) => {
    const img = item.querySelector('.item-image');
    const text = item.querySelector('.item-text');
    const num = item.querySelector('.bg-number');
    const itemTl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 80%", toggleActions: "restart none none reset" }});
    itemTl.to(img, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" })
            .to(text, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
            .to(num, { opacity: 0.1, duration: 1.5 }, "-=1.4");
});

// 바나나 후숙 과정 애니메이션 속도 조절
const ripTl = gsap.timeline({ 
    scrollTrigger: { 
        trigger: "#ripening", 
        start: "top 75%", 
        toggleActions: "play none none reset" 
    }
});

ripTl.to("#hTitle", { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" })
        .to(".h-card", { 
            opacity: 1, 
            y: 0, 
            duration: 1.8,  /* 더 묵직하게 올라오도록 수정 */
            ease: "power4.out", 
            stagger: 0.3    /* 카드 간격 시차를 더 줌 */
        }, "-=1.0");

// Horizontal Scroll 관성 조절
if (window.innerWidth > 1024) {
    let wrapper = document.querySelector("#horizontalWrapper");
    gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth + window.innerWidth * 0.1),
        ease: "none",
        scrollTrigger: { 
            trigger: "#ripening", 
            start: "top top", 
            end: () => "+=" + (wrapper.scrollWidth * 1.5), /* 스크롤 구간을 더 길게 잡아 속도 늦춤 */
            scrub: 1.5, /* 멈출 때 부드럽게 멈추도록 관성 추가 */
            pin: true, 
            invalidateOnRefresh: true 
        }
    });
}

// Parallax Text
gsap.to("#parade", { xPercent: -30, scrollTrigger: { trigger: "#visualSec", scrub: 2 } });