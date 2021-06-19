export const ballConf = {
  auto: false, // AUTO 모드
  radius: 20, // 반지름
  speed: 6, // AUTO 모드의 공 속도
  color: '#ffdd1c', // 색상
};

export const strConf = {
  color: '#ff5038', // 색상
  lienWidth: 4, // 두깨
  horizontalSpace: 20, // 줄의 좌우 간격
  verticalSpace: 20, // 줄의 상하 간격
  bounce: 0.92, // 튕김 강도
  moveMin: 0.01, // 최소한의 움직임 감도
  detectBefore: 10, // 줄이 포인터를 만나기 전에 민감도
  detectAfter: 300, // 줄이 포인터와 접촉한 후 민감도
};

const deepFreeze = (target) => {
  if (target && typeof target === 'object') {
    if (!Object.isFrozen(target)) Object.freeze(target);
    Object.values(target).forEach((value) => deepFreeze(value));
  }
};

[ballConf, strConf].forEach(deepFreeze);
