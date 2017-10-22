import detections from './detections.json';

export default function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(detections);
    }, 500);
  });
}
