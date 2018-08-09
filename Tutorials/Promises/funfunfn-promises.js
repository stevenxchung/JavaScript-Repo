// Example 1
import loadImagePromised from './load-image-promised';

loadImagePromised('images/cat1.jpg').then(img => {
  let imgElement = document.createElement('img');
  imgElement.src = img.src;
  document.body.appendChild(imgElement);
});

// Example 2
import loadImagePromised from './load-image-promised';

let whenCatLoaded = loadImagePromised('images/cat3.jpg');

whenCatLoaded.then(img => {
  let imgElement = document.createElement('img');
  imgElement.src = img.src;
  document.body.appendChild(imgElement);
});
