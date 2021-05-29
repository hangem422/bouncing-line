# Bouncing Line

## 원본

파일 구조와, 코드 스타일을 변경했습니다. 원본을 참고하고 싶으시면 아래 링크를 이용해주세요.

- **원작자**: Interactive Developer
- **링크**: [HTML5 Canvas Tutorial : 자바스크립트로 줄 튕기는 효과 만들기](https://www.youtube.com/watch?v=dXhAQbE8iBg&list=PLGf_tBShGSDNGHhFBT4pKFRMpiBrZJXCm&index=3)

## 개선점

### 마우소 포인터 성능 개선

- 포인트 이벤트 리스너 최적화

  - `pointermove` 이벤트 콜백 함수가 매번 실행되지 않도록, `pointerdown` 이벤트에서 등록되고 `pointerup` 이벤트에서 삭제되도록 수정

### 줄 성능 개선

- 점과 직선의 거리 구하는 방법 단순화

  - 포인터와 줄 사이의 거리를 구하는 방법으로 기존 코드는 벡터의 정사영 개념을 사용했습니다.
  - 직선의 방정식을 사용한 점과 직선 사이의 거리 공식으로 방법을 변경했습니다.

- 포인터를 빠르게 움직이면 줄이 튕기지 않는 오류 발견

  - 포인터를 빠르게 움직이면 `pointermove` 이벤트의 좌표가 감지 가능한 범위를 스킵하는 현상이 발생
  - 이전 포인터 좌표를 기억하여, 현재 포인트 좌표와의 부등호가 다를 경우를 별도 처리하여 해결

- 줄 리사이징 성능 향상

  - 브라우저 리사이징할 때 기존 코드는 모든 줄을 다시 만듬. 리사이징 시 기존의 줄 객체를 재활용하고 필용에 따라 새로운 객체를 추가/삭제하도록 변경
  - 기존 코드에서 리사이징하면 줄 튕기는 에니메이션이 초기화되는 부자연스러움 발견. 기존 줄 객체를 재활용함으로써 라사이징 시에도 이 전의 움직임을 계속 이어나가도록 변경
