# Bouncing Line

## 원본

- **원작자**: Interactive Developer
- **링크**: [HTML5 Canvas Tutorial : 자바스크립트로 줄 튕기는 효과 만들기](https://www.youtube.com/watch?v=dXhAQbE8iBg&list=PLGf_tBShGSDNGHhFBT4pKFRMpiBrZJXCm&index=3)

## 개선점

### 마우소 포인터 최적화

1. `pointermove` 이벤트 콜백 함수가 매번 실행되지 않도록, `pointerdown` 이벤트에서 등록되고 `pointerup` 이벤트에서 삭제되도록 수정
