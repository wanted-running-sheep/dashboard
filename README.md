# 🎬 프리온보딩 3차 광고 플랫폼 대시보드 개발

1. [프로젝트 소개](#1-프로젝트-소개)
2. [구현 기능](#2-구현-기능)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [역할](#4-역할)
5. [프로젝트 제작 과정](#5-프로젝트-제작-과정)
6. [프로젝트 설치 및 실행](#6-프로젝트-설치-및-실행)

<br/>
[🌍 배포 링크](https://dasheep-board.herokuapp.com/)

<br />

## 1. 프로젝트 소개

- 개요: 원티드 프리온보딩 5기 3번째 팀 과제
- 주제: 광고 플랫폼 대시보드 개발
- 기간: 2022.07.14 ~ 2022.07.20 (주말 제외)

<br />

## 2. 구현 기능

### 🔥 과제 요구 기능

**메뉴**

- [x] 메뉴에 각 페이지(대시보드, 광고관리)로 이동하는 탭 구현
- [x] 상단 `검색 입력 input`, `검색 button` 요소 추가
- [x] 모바일 반응형 구현 (480px 이하)
  - [x] 메뉴는 헤더에 포함
  - [x] 메뉴가 `hamburger icon`으로 변경
  - [x] hamburger 클릭 시 메뉴 탭 보이도록 구현

**헤더**

- [x] 유저 아바타와 유저이름, 설정, 알림 아이콘 포함

**대시보드**

- [x] `Line chart`와 `stacked bar chart` 포함
- [x] 통합 광고 현황의 데이터를 활용하여 통합 광고 현황 컴포넌트 개발
- [x] 통합 광고 현황의 `드랍다운`(주간) 클릭 할 때마다 `데이터 변경`
- [x] 조회 주간이 변경 될 때마다 두 개의 차트 데이터 변경
- [x] Line chart의 데이터는 `ROAS`와 `클릭 수` 표시
- [x] 매체 현황의 데이터를 활용하여 매체 현황 컴포넌트 개발 (chart, table)

**광고 관리**

- [x] 광고 관리 페이지 상단의 드랍다운으로 `filtering` 구현 (`전체`, `현재 진행중`, `종료`)
- [x] 수정 버튼 클릭하여 `수정` 가능하도록 구현
- [x] 광고 만들기로 `생성` 가능하도록 구현

## 3. 프로젝트 구조

```
📁 src
├── @types

├── api
│   ├── http
│   ├── instance
│   └── models

├── assets

├── components
│   ├── Layout
│   │   ├── Header
│   │   ├── NavigationBar
│   │   └── Title
│   ├── AdvertisingCard
│   ├── AdvertisingStatus
│   ├── CalendarInput
│   ├── Dropdown
│   ├── Management
│   ├── ManagementButton
│   ├── ManagementForm
│   ├── ManagementHeader
│   ├── ManagementInput
│   ├── MediaStatus
│   ├── MediaStatusTable
│   └── Report

├── constants

├── hooks
│   ├── useDrawer
│   ├── useFormattedMedia
│   ├── useManagement
│   └── useSummaryData

├── pages
│   ├── DashboardPage
│   └── ManagementPage

├── routes

├── styles
│   ├── globalStyles
│   ├── media
│   ├── mixins
│   └── theme

├── utils
│   ├── adsFormValidate
│   ├── changeDateFormat
│   ├── createRenderAds
│   ├── createWeeklyList
│   ├── dateFormat
│   ├── findClickedMenu
│   ├── getCommaLocalString
│   ├── makePropsAdvertisement
│   ├── makeViewData
│   ├── putCommaIntoNumber
│   └── setPostReqVal
│
├── App.tsx
└── index.tsx
```

<br />

## 4. 역할

| 이름                                       | 담당 역할                                                                                           |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| [ 양아름 ](https://github.com/areumsheep)  | CRA 초기 세팅, theme 세팅, Nav바 개발, 광고매체현황 그래프 컴포넌트 개발, 모바일 반응형 대응        |
| [ 조현호 ](https://github.com/hajun2)      | Nav바 개발, 광고 매체 현황 테이블 컴포넌트 개발, 모바일 반응형 대응                                 |
| [ 최창열 ](https://github.com/pinkdumbbel) | data fetching module 개발, 통합광고현황 컴포넌트 개발(차트), 광고관리 컴포넌트 개발(추가, 상태필터) |
| [ 최중재 ](https://github.com/joong8812)   | data fetching module 개발, 통합광고현황 컴포넌트 개발(요약), 광고관리 컴포넌트 개발(수정)           |

<br />

## 5. 프로젝트 제작 과정

### [1] 컨벤션은 협의하여 아래와 같이 정의하였습니다 🥳

| 커밋명      | 내용                                             |
| ----------- | ------------------------------------------------ |
| ✨ feat     | 파일, 폴더, 새로운 기능 추가                     |
| 🐛 fix      | 버그 수정                                        |
| 💄 style    | 코드 스타일 변경                                 |
| 📝 docs     | 문서 생성, 추가, 수정(README.md)                 |
| ♻️ refactor | 코드 리팩토링                                    |
| 💩 chore    | 코드 수정 (JSON 데이터 포맷 변경 / scss 변경 등) |

자세한 내용은 [여기](https://github.com/wanted-running-sheep/dashboard/issues/1)에서 확인해주세요!

### [2] 2명씩 2팀으로 나누어 원하는 컴포넌트 개발을 진행한 뒤 병합 작업을 진행하였습니다 🏃

- 각 팀별로 원하는 컴포넌트 기능 개발로 새로운 경험을 하며 실력을 키울 수 있었습니다!
- 서로 진행된 작업까지의 PR을 날리고 코멘트를 받는 경험을 통해 더 나은 코드란 무엇일지, 다른 사람이 더 쉽게 이해할 수 있는 변수, 함수명을 고민할 수 있었습니다.

### [3] 각 기능별로 구현이 완료된 뒤 팀 별 페어프로그래밍을 통해 페이지를 완성하였습니다 🔥

- [진행한 PR은 여기를 확인해주세요!](https://github.com/wanted-running-sheep/dashboard/pulls?q=is%3Apr+is%3Aclosed)
- 각 팀의 인원은 최소화하여 의견 취합에 문제가 없도록 하였습니다.
- 페이지 하나에 합치는 작업을 페어 프로그래밍이라는 방법을 통해 더 빠르게 진행할 수 있었습니다.

### [4] 오프라인 모각코를 통해 팀워크를 높이고 개발 속도를 높였습니다 💨
![KakaoTalk_Photo_2022-07-19-23-52-19 002 (1)](https://user-images.githubusercontent.com/48716298/179922374-5880e1f9-776f-4368-a679-4b016f1b7cca.png)

<br/>

## 6. 프로젝트 설치 및 실행

1. Git Clone

```command
$ git clone
```

2. 프로젝트 실행

```command
$ npm install
$ npm run start
```
