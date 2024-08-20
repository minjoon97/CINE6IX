//API생성함수
// import API_KEY from "config.js";

//모달 엘리먼트
const $infoModal = document.getElementById("infoModal");
const $infoModalBg = document.getElementById("infoModalBg");
const $closeModal = document.getElementById("closeModal");
let $modalTitle = document.querySelector(".modalTitle");
let $modalCate = document.querySelector(".modalCate");
let $modalStory = document.querySelector(".modalStory");
let $modalInfoDate = document.querySelector(".modalInfoDate");
let $modalInfoBudget = document.querySelector(".modalInfoBudget");
let $modalInfoNation = document.querySelector(".modalInfoNation");
let $modalInfoPoint = document.querySelector(".modalInfoPoint");
let $modalPhoto = document.querySelector(".modalPhoto");
const $registerInput = document.querySelector(".registerInput");

//sec01 엘리먼트
let $s1movieListLine = document.querySelectorAll(".s1movieListLine");
const $s1_line4 = document.querySelector(".s1_line:nth-of-type(4)");
const $s1_line5 = document.querySelector(".s1_line:nth-of-type(5)");
const $s1MoreItem = document.querySelector(".s1MoreItem");
const $s1pagination = document.querySelector(".s1pagination");
const $s1paginationWrapper = document.querySelector(".s1paginationWrapper");

//sec02 엘리먼트
const $svInfoLeft = document.querySelector(".svInfoLeft");
const $svInfoRight = document.querySelector(".svInfoRight");
const $s2dotsSpan = document.querySelectorAll(".s2dots > span");
const $slideItem01Cover = document.querySelector(".slideItem01Cover");
let $slideItem = document.querySelectorAll(".slideItem");

//sec03 엘리먼트
const $s3MoreItem = document.querySelector(".s3MoreItem");
const $s3pagination = document.querySelector(".s3pagination");
const $s3line3 = document.querySelector(".s3_line:nth-of-type(3)");
const $s3line4 = document.querySelector(".s3_line:nth-of-type(4)");
let $s3movieListLine = document.querySelectorAll(".s3movieListLine");
const $s3paginationWrapper = document.querySelector(".s3paginationWrapper");

//전역변수
let mvName = "";
let posterPath = "";
let s1page = 1;
let s3page = 1;
let s1LargePage = 0;
let s3LargePage = 0;
let s3genre = 12;
let urlTypes1 = "discover/movie";
let urlTMDB1 = `https://api.themoviedb.org/3/${urlTypes1}?api_key=9503cbadb5d04ce615df8189b0219b11&page=${s1page}&language=ko`;
let urlTMDB2 = `https://api.themoviedb.org/3/movie/upcoming?api_key=9503cbadb5d04ce615df8189b0219b11&language=ko`;
let urlTMDB3 = `https://api.themoviedb.org/3/discover/movie?api_key=9503cbadb5d04ce615df8189b0219b11&language=ko&sort_by=popularity.desc&with_genres=${s3genre}&page=${s3page}`;

//TMDB에서 가져온 검색된 영화의 리스트 (sec01)
let s1dataTMDB = "";
let s1dataCount = "";

//TMDB에서 가져온 최신 영화의 리스트 (sec02)
let s2dataTMDB = "";

//TMDB에서 가져온 높은평점의 영화 리스트 (sec03)
let s3dataTMDB = "";
let s3dataCount = "";

//모달 on될 때 detail페이지에서 가져온 정보
let dataDetail = "";

// s2슬라이드 카운트
let s2SlideCount = 0;

//
//sec01 검색
const $s1SearchButton = document.querySelector(".s1SearchButton");
const $s1Input = document.querySelector(".s1Input");
const sec01Search = () => {
  ReturnBlankLine();
  $s1_line4.classList.remove("on");
  $s1_line5.classList.remove("on");
  $s1paginationWrapper.classList.remove("on");
  $s1MoreItem.classList.remove("on");
  s1page = 1;
  s1LargePage = 0;
  urlTypes1 = "search/movie";
  const $s1Input = document.querySelector(".s1Input");
  mvName = $s1Input.value;
  urlTMDB1 = `https://api.themoviedb.org/3/${urlTypes1}?api_key=9503cbadb5d04ce615df8189b0219b11&query=${mvName}&page=${s1page}&language=ko`;
  $s1Input.value = "";
  $s1movieListLine = document.querySelectorAll(".s1movieListLine");
  $s1movieListLine.forEach((line) => {
    line.innerHTML = ``;
  });
  fetchMovie();
};

$s1SearchButton.addEventListener("click", () => {
  sec01Search();
});

$s1Input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // 기본 Enter 동작 방지 (예: 폼 제출)
    sec01Search();
  }
});

//
//sec01 리스트 불러오기
const fetchMovie = async () => {
  urlTMDB1 = `https://api.themoviedb.org/3/${urlTypes1}?api_key=9503cbadb5d04ce615df8189b0219b11&query=${mvName}&page=${s1page}&language=ko`;
  const resTM = await fetch(urlTMDB1);
  const fetchedResultTM = await resTM.json();
  s1dataCount = fetchedResultTM.total_results;
  s1paginationCreate();
  s1dataTMDB = fetchedResultTM.results;
  let movieNum = -1;
  for (let l = 0; l < 5; l++) {
    for (let m = 0; m < 4; m++) {
      movieNum++;
      if (movieNum === s1dataTMDB.length) {
        deleteBlankLine();
        return;
      }
      let posterPath = `https://image.tmdb.org/t/p/w400/${s1dataTMDB[movieNum].poster_path}`;
      let mvCate = s1dataTMDB[movieNum].vote_average;
      let mvName = s1dataTMDB[movieNum].title;
      let mvDate = s1dataTMDB[movieNum].release_date.slice(0, 4);
      if (s1dataTMDB[movieNum].poster_path === null) {
        posterPath = `img/Noimage.png`;
      }
      const $s1newMv = document.createElement("li");
      $s1newMv.innerHTML = `
                    <div class="imgFit" style = "background-image: url(${posterPath})"></div>
                    <div class="s1mvInfoShort">
                      <div>
                        <span class="mvCateShort">${mvCate}</span>
                        <span class="mvNameShort">${mvName}</span>
                      </div>
                      <span class="mvTimeShort">${mvDate}</span>
                    </div>
      `;
      $s1newMv.classList.add(s1dataTMDB[movieNum].id);
      $s1movieListLine[l].appendChild($s1newMv);
    }
  }
};
fetchMovie();

//
//마지막까지 업로드가 완성되면, 아이템이 없는 줄은 삭제
const deleteBlankLine = () => {
  const $s1listOneLine = document.querySelectorAll(".s1movieList > li");
  $s1listOneLine.forEach((line) => {
    const nestedLi = line.querySelector("li");
    if (!nestedLi) {
      console.log(line);
      line.classList.remove("on");
    }
  });
};

//
//다시 모든 줄의 display를 돌려놓기
const ReturnBlankLine = () => {
  const $s1listOneLine = document.querySelectorAll(".s1movieList > li");
  $s1listOneLine.forEach((line) => {
    line.classList.add("on");
  });
};

//
//s1pagination생성
const s1paginationCreate = () => {
  $s1pagination.innerHTML = ``;
  for (
    let i = 0 + s1LargePage;
    i < Math.min(5 + s1LargePage, Math.ceil(s1dataCount / 20));
    i++
  ) {
    const paginationItem = document.createElement("span");
    paginationItem.innerHTML = i + 1;
    paginationItem.classList.add("nums1");
    if (i === s1LargePage) {
      paginationItem.classList.add("on");
    }
    $s1pagination.appendChild(paginationItem);
  }
};

//
//s1pagination클릭
$s1pagination.addEventListener("click", async (e) => {
  s1page = e.target.innerText;
  if (s1page.length > 4) {
    return;
  }
  $s1movieListLine.forEach((line) => {
    line.innerHTML = ``;
  });
  $s1pagination.innerHTML = ``;
  ReturnBlankLine();
  await fetchMovie();
  const $s1paginationItems = document.querySelectorAll(".nums1");
  $s1paginationItems.forEach((item) => {
    item.classList.remove("on");
  });
  $s1paginationItems[s1page - 1 - s1LargePage].classList.add("on");
});

//
//s1pagination그룹넘기기
const $s1pagRight = document.querySelector(".s1pagRight");
$s1pagRight.addEventListener("click", () => {
  if (Math.ceil(s1dataCount / 20) <= s1LargePage + 5) {
    return;
  }
  s1LargePage += 5;
  s1page = s1LargePage + 1;
  $s1movieListLine.forEach((line) => {
    line.innerHTML = ``;
  });
  fetchMovie();
});

const $s1pagLeft = document.querySelector(".s1pagLeft");
$s1pagLeft.addEventListener("click", () => {
  if (s1LargePage === 0) {
    return;
  }
  s1LargePage -= 5;
  s1page = s1LargePage + 1;
  $s1movieListLine.forEach((line) => {
    line.innerHTML = ``;
  });
  fetchMovie();
});

//
//s1 더보기 클릭 시 4,5번째 줄 노출
$s1MoreItem.addEventListener("click", () => {
  $s1_line4.classList.add("on");
  $s1_line5.classList.add("on");
  $s1paginationWrapper.classList.add("on");
  $s1MoreItem.classList.add("on");
  deleteBlankLine();
});

//
//모달 불러오기
const BringModal = (dataTMDB, e) => {
  //clickedElement는 li가 됨
  let clickedElement = e.target;
  while (clickedElement.tagName !== "LI") {
    clickedElement = clickedElement.parentElement;
  }
  const targetObject = dataTMDB.find(
    (item) => item.id === Number(clickedElement.className)
  );
  //TMDB Detail 페이지에서 상세정보 가져오기
  fetchSpec(targetObject);
};

//
//s1 모달 불러오기
$s1movieListLine.forEach((list) => {
  list.addEventListener("click", (e) => {
    BringModal(s1dataTMDB, e);
  });
});

//
//sec02 큰포스터 클릭 시 모달
$slideItem01Cover.addEventListener("click", () => {
  //TMDB Detail 페이지에서 상세정보 가져오기
  fetchSpec(s2dataTMDB[s2SlideCount]);
});

//
//s3 모달 불러오기
$s3movieListLine.forEach((list) => {
  list.addEventListener("click", (e) => {
    BringModal(s3dataTMDB, e);
  });
});

//
//TMDB Detail 페이지에서 상세정보 가져오기
const fetchSpec = async (detailSource) => {
  let mvID = detailSource.id;
  const resDetail = await fetch(
    `https://api.themoviedb.org/3/movie/${mvID}?api_key=9503cbadb5d04ce615df8189b0219b11&language=ko`
  );
  const fetchedResultDetail = await resDetail.json();
  dataDetail = fetchedResultDetail;
  let modalCatePart = "";
  dataDetail.genres.forEach((item) => {
    if (item === dataDetail.genres[dataDetail.genres.length - 1]) {
      modalCatePart += `${item.name}`;
    } else {
      modalCatePart += `${item.name} / `;
    }
  });
  $modalTitle.innerText = dataDetail.title;
  $modalStory.innerText = dataDetail.overview;
  $modalPhoto.style.cssText = `background-image:url("https://image.tmdb.org/t/p/w400/${dataDetail.backdrop_path}")`;
  $modalCate.innerText = modalCatePart;
  $modalInfoDate.innerText = dataDetail.release_date;
  if (dataDetail.budget !== 0) {
    $modalInfoBudget.innerText = `${dataDetail.budget} USD`;
  } else {
    $modalInfoBudget.innerText = "정보없음";
  }
  $modalInfoNation.innerText = dataDetail.origin_country[0];
  $modalInfoPoint.innerText = dataDetail.vote_average;
  //한줄평 업데이트
  loadStorage();
  //모달class on추가
  $infoModal.classList.add("on");
  $infoModalBg.classList.add("on");
};

//
//모달 사라지기
$closeModal.addEventListener("click", () => {
  $infoModal.classList.remove("on");
  $infoModalBg.classList.remove("on");
});

//
//sec02 리스트 불러오기
const fetchMovieS2 = async () => {
  const resTM = await fetch(urlTMDB2);
  const fetchedResultTM = await resTM.json();
  s2dataTMDB = fetchedResultTM.results;
  s2dataTMDB = s2dataTMDB.slice(0, 10);
  showSlideS2();
};
fetchMovieS2();

//
//sec02 리스트 노출하기
const showSlideS2 = () => {
  for (let i = 0; i < 6; i++) {
    $slideItem[i].style.cssText = `
    background-image:url("https://image.tmdb.org/t/p/w400/${
      s2dataTMDB[(i + s2SlideCount) % 10].poster_path
    }")
    `;
    const $s2mvInfoText = document.querySelector(".s2mvInfoText");
    $s2mvInfoText.innerHTML = `
    <p class="s2mvInfo_title">${s2dataTMDB[s2SlideCount].title}</p>
                    <p class="s2mvInfo_etc">${s2dataTMDB[s2SlideCount].original_title}</p>
                    <p class="s2mvInfo_story">
                    ${s2dataTMDB[s2SlideCount].overview}
                    </p>
    `;
  }
};

//
//sec02 버튼으로 순서변경
$svInfoRight.addEventListener("click", async () => {
  await fadeOut();
  s2SlideCount === 9 ? (s2SlideCount = 0) : s2SlideCount++;
  showSlideS2();
  updateDot();
  await fadeIn();
});

$svInfoLeft.addEventListener("click", async () => {
  await fadeOut();
  s2SlideCount === 0 ? (s2SlideCount = 9) : s2SlideCount--;
  showSlideS2();
  updateDot();
  await fadeIn();
});

//
//sec02 포스터 클릭 시 순서변경
$slideItem.forEach((item) => {
  item.addEventListener("click", async () => {
    if (Array.from($slideItem).indexOf(item) === 0) {
      return;
    }
    await fadeOut();
    s2SlideCount += Array.from($slideItem).indexOf(item);
    s2SlideCount = s2SlideCount % 10;
    showSlideS2();
    updateDot();
    await fadeIn();
  });
});

//
//sec02 dot 클릭 시 순서변경
$s2dotsSpan.forEach((span) => {
  span.addEventListener("click", async () => {
    await fadeOut();
    s2SlideCount = Array.from($s2dotsSpan).indexOf(span);
    showSlideS2();
    updateDot();
    await fadeIn();
  });
});

//
//dot의 on클래스 업데이트
const updateDot = () => {
  $s2dotsSpan.forEach((span) => {
    span.classList.remove("on");
  });
  $s2dotsSpan[s2SlideCount].classList.add("on");
};

//
//fadeOut/In(슬라이드 넘어가는효과)
const fadeOut = () => {
  return new Promise((resolve) => {
    $slideItem01Cover.classList.add("on");
    setTimeout(resolve, 200); // 500ms 후에 resolve를 호출
  });
};

const fadeIn = () => {
  return new Promise((resolve) => {
    $slideItem01Cover.classList.remove("on");
    setTimeout(resolve, 200); // 500ms 후에 resolve를 호출
  });
};

//
//sec03 리스트 불러오기 (리펙토링 시, dataCount랑 dataTMBD 매개변수로 빼서 콜백으로 빼기 가능)
const fetchMovieS3 = async () => {
  let urlTMDB3 = `https://api.themoviedb.org/3/discover/movie?api_key=9503cbadb5d04ce615df8189b0219b11&language=ko&sort_by=popularity.desc&with_genres=${s3genre}&page=${s3page}`;
  const resTM = await fetch(urlTMDB3);
  const fetchedResultTM = await resTM.json();
  s3dataCount = fetchedResultTM.total_results;
  s3paginationCreate();
  s3dataTMDB = fetchedResultTM.results;
  let movieNum = -1;
  for (let l = 0; l < 4; l++) {
    for (let m = 0; m < 5; m++) {
      movieNum++;
      if (movieNum === s3dataTMDB.length) {
        return;
      }
      let posterPath = `https://image.tmdb.org/t/p/w400/${s3dataTMDB[movieNum].poster_path}`;
      let mvCate = s3dataTMDB[movieNum].vote_average;
      let mvName = s3dataTMDB[movieNum].title;
      let mvDate = s3dataTMDB[movieNum].release_date.slice(0, 4);
      if (s3dataTMDB[movieNum].poster_path === null) {
        posterPath = `img/noimage.png`;
      }
      const $s3newMv = document.createElement("li");
      $s3newMv.innerHTML = `
                    <div class="imgFit" style = "background-image: url(${posterPath})"></div>
                    <div class="s3mvInfoShort">
                      <div>
                        <span class="mvCateShort">${mvCate}</span>
                        <span class="mvNameShorts3">${mvName}</span>
                      </div>
                      <span class="mvTimeShort">${mvDate}</span>
                    </div>
      `;
      $s3newMv.classList.add(s3dataTMDB[movieNum].id);
      $s3movieListLine[l].appendChild($s3newMv);
    }
  }
};
fetchMovieS3();

//
//s3카테고리 선택
const $s3cateItem = document.querySelectorAll(".s3cateItem");
$s3cateItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    $s3line3.classList.remove("on");
    $s3line4.classList.remove("on");
    $s3paginationWrapper.classList.remove("on");
    $s3MoreItem.classList.remove("on");
    s3page = 1;
    s3LargePage = 0;
    s3genre = item.id;
    $s3cateItem.forEach((item) => {
      item.classList.remove("on");
    });
    e.target.classList.add("on");
    $s3movieListLine.forEach((line) => {
      line.innerHTML = ``;
    });
    fetchMovieS3();
  });
});

//
//s3pagination생성
const s3paginationCreate = () => {
  $s3pagination.innerHTML = ``;
  for (let i = 0 + s3LargePage; i < 5 + s3LargePage; i++) {
    const paginationItem = document.createElement("span");
    paginationItem.innerHTML = i + 1;
    paginationItem.classList.add("nums3");
    if (i === s3LargePage) {
      paginationItem.classList.add("on");
    }
    $s3pagination.appendChild(paginationItem);
  }
};

//
//s3pagination클릭
$s3pagination.addEventListener("click", async (e) => {
  s3page = e.target.innerText;
  if (s3page.length > 4) {
    return;
  }
  $s3movieListLine.forEach((line) => {
    line.innerHTML = ``;
  });
  $s3pagination.innerHTML = ``;
  await fetchMovieS3();
  const $s3paginationItems = document.querySelectorAll(".nums3");
  $s3paginationItems.forEach((item) => {
    item.classList.remove("on");
  });
  $s3paginationItems[s3page - 1 - s3LargePage].classList.add("on");
  console.log($s3paginationItems[s3page - 1]);
});

//
//s1pagination그룹넘기기
const $s3pagRight = document.querySelector(".s3pagRight");
$s3pagRight.addEventListener("click", () => {
  if (Math.ceil(s3dataCount / 20) <= s3LargePage + 5) {
    return;
  }
  s3LargePage += 5;
  s3page = s3LargePage + 1;
  $s3movieListLine.forEach((line) => {
    line.innerHTML = ``;
  });
  fetchMovieS3();
});

const $s3pagLeft = document.querySelector(".s3pagLeft");
$s3pagLeft.addEventListener("click", () => {
  if (s3LargePage === 0) {
    return;
  }
  s3LargePage -= 5;
  s3page = s3LargePage + 1;
  $s3movieListLine.forEach((line) => {
    line.innerHTML = ``;
  });
  fetchMovieS3();
});

//
//s3 더보기 클릭 시 3,4번째 줄 노출
$s3MoreItem.addEventListener("click", () => {
  $s3line3.classList.add("on");
  $s3line4.classList.add("on");
  $s3paginationWrapper.classList.add("on");
  $s3MoreItem.classList.add("on");
});

//
//local storage 가져오기
let reviewList = JSON.parse(localStorage.getItem(dataDetail.id)) || [];
const loadStorage = () => {
  reviewList = JSON.parse(localStorage.getItem(dataDetail.id)) || [];
  const $modalSentence = document.querySelector(".modalSentence > p");
  $modalSentence.innerHTML = `${reviewList}`;
  $registerInput.value = "";
};

//
//local storage 저장하기
const $register = document.querySelector(".register");
$register.addEventListener("click", () => {
  const reviewInput = $registerInput.value;
  localStorage.setItem(dataDetail.id, JSON.stringify(reviewInput));
  loadStorage();
});
