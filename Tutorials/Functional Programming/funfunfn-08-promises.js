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

// Example 3
import loadImageCallbacked from './load-image-callbacked';

loadImageCallbacked('images/cat4.jpg', (error, img) => {
  let imgElement = document.createElement('img');
  imgElement.src = img.src;
  document.body.appendChild(imgElement);
});

// Example 4
import loadImageCallbacked from './load-image-callbacked';

let addImg = src => {
  let imgElement = document.createElement('img');
  imgElement.src = src;
  document.body.appendChild(imgElement);
};

loadImageCallbacked('images/cat1.jpg', (error, img1) => {
  if (error) throw error;
  addImg(img1.src);
  loadImageCallbacked('images/cat2.jpg', (error, img2) => {
    if (error) throw error;
    addImg(img2.src);
    loadImageCallbacked('images/cat3.jpg', (error, img3) => {
      if (error) throw error;
      addImg(img3.src);
    });
  });
});

// Example 5
import 'babelify/polyfill';

function loadImage(url, callback) {
  let image = new Image();

  image.onload = function() {
    callback(null, image);
  };

  image.onerror = function() {
    let message = 'Could not load image at ' + url;
    callback(new Error(msg));
  };

  image.src = url;
}
// export default loadImage;

// Example 6
import 'babelify/polyfill';
import { resolve } from 'path';

function loadImage(url) {
  return new Promise((resolve, reject) => {
    let image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      let message = 'Could not load image at ' + url;
      reject(new Error(msg));
    };

    image.src = url;
  });
}
// export default loadImage;

// Example 7
import loadImage from './load-image-callbacked';

let addImg = src => {
  let imgElement = document.createElement('img');
  imgElement.src = src;
  document.body.appendChild(imgElement);
};

loadImage('images/cat1.jpg').then(img1 => {
  addImg(img1.src);
  loadImage('images/cat2.jpg').then(img2 => {
    addImg(img2.src);
    loadImage('images/cat3.jpg').then(img3 => {
      addImg(img3.src);
    });
  });
});

// Example 8
import loadImage from './load-image';

let addImg = src => {
  let imgElement = document.createElement('img');
  imgElement.src = src;
  document.body.appendChild(imgElement);
};

Promise.all([
  loadImage('images/cat1.jpg'),
  loadImage('images/cat2.jpg'),
  loadImage('images/cat3.jpg')
])
  .then(images => {
    images.forEach(img => addImg(img.src));
  })
  .catch(error => {
    // Handles error here
  });
