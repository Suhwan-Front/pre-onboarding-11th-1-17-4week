# 프리온보딩 4주차 과제

실행 방법

> npm install

> npm start

### 1. 질환명 검색시 API 호출을 통해서 검색어 추천 기능

입력마다 API를 호출하는 문제를 어떻게 할까 고민을 하다. 5초 단위로 계산을 생각했습니다.

```js
useEffect(() => {
  if (typingTimeout) {
    clearTimeout(typingTimeout)
  }
  // 500ms 후에 API를 호출하도록 타이머 설정
  const newTypingTimeout = setTimeout(() => {
    setSearchQuery(searchQuery)
  }, 500)

  setTypingTimeout(newTypingTimeout)
}, [searchQuery]) //searchQuery는 Input에 value입니다
```

타이핑마다 불러오는 번거러움은 줄었지만 여전히 많이 불러온다는 단점이 있습니다. **Debounce**와 **Throttle**라는 라이브러리로 호출 횟수를 많이 줄일 수 있다는 걸 검색을 통해 알게되었는데 사용가능 여부를 몰라 사용하진 않았습니다.

### 2. API 호출별로 로컬 캐싱 구현

뜻에 대해 고민을 많이 했었습니다. API를 호출한걸 로컬 스토리지에 저장하고 캐쉬 데이터 처럼 반복해서 가져오는걸 막는 역할을 말하지 않을까 생각했습니다.

```js
useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery !== '') {
          console.info('calling api')
          // 캐시에 해당 쿼리 결과가 있으면 다시 API를 호출하지 않고 캐시에서 가져옴
          if (cachedSearchQueries.current.includes(searchQuery)) {
            setHealthList(cachedData.current[searchQuery])
          }
          // -- 중략 -- //
            // 캐시에 결과 저장
            cachedSearchQueries.current.push(searchQuery)
            cachedData.current[searchQuery] = filteredData
          }
```

> **expire time**을 구상하였으나 타입 스크립트 미숙으로 코드에 적용하지는 못하였습니다. 코드는 아래와 같이 구상하였습니다.

```js
const fetchData = async () => {
      try {
        if (searchQuery !== '') {
          const now = Date.now();
          if (
            cachedSearchQueries.current.includes(searchQuery) &&
            now - cachedData.current[searchQuery].timestamp < CACHE_EXPIRATION_TIME // 5 * 60 * 1000
          ) {
            // 캐시가 유효한 경우
            setHealthList(cachedData.current[searchQuery].data);
          } else {
            // -- 중략 -- //
            cachedSearchQueries.current.push(searchQuery);
            cachedData.current[searchQuery] = {
              data: filteredData,
              timestamp: now, // 현재 시간을 캐시 데이터와 함께 저장
            };
            localStorage.setItem(
              'cachedData',
              JSON.stringify({
                data: cachedData.current,
                searchQueries: cachedSearchQueries.current,
              }),
            );
          }
        }
```

### 3. 구현 화면

![result](./dist/result.gif)

아쉽게 키보드만으로 추천 검색어들로 이동 가능하도록 구현은 실패했습니다... 코드를 수정하다 실수한것 같습니다...
