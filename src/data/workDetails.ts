import work1 from '../subpage/1.png'
import work2 from '../subpage/2.png'
import work3 from '../subpage/3.png'
import work4 from '../subpage/4.png'
import work5 from '../subpage/5.png'
import work6 from '../subpage/6.png'
import work7 from '../subpage/7.png'
import work8 from '../subpage/8.png'
import work9 from '../subpage/9.png'
import work10 from '../subpage/10.png'
import p1Main from '../assets/project/p1/1.jpeg'
import p1Section2 from '../assets/project/p1/2.jpeg'
import p1Section3 from '../assets/project/p1/3.jpeg'
import p1Section4 from '../assets/project/p1/4.jpeg'

const p2ImageModules = import.meta.glob('../assets/project/p2/*.{jpg,jpeg,JPG,JPEG,png,PNG}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const getImageNumber = (path: string) => {
  const filename = path.split('/').pop() ?? ''
  const basename = filename.replace(/\.[^.]+$/, '')
  const parsed = parseInt(basename, 10)
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed
}

const p2Images = Object.entries(p2ImageModules)
  .sort(([leftPath], [rightPath]) => getImageNumber(leftPath) - getImageNumber(rightPath))
  .map(([, url]) => url)

const p2ImageByNumber = (imageNumber: number) =>
  p2Images.find((url) => {
    const filename = url.split('/').pop() ?? ''
    return parseInt(filename.replace(/\.[^.]+$/, ''), 10) === imageNumber
  })

const p3ImageModules = import.meta.glob('../assets/project/p3/*.{jpg,jpeg,JPG,JPEG,png,PNG}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const p3Images = Object.entries(p3ImageModules)
  .sort(([leftPath], [rightPath]) => getImageNumber(leftPath) - getImageNumber(rightPath))
  .map(([, url]) => url)

const p3ImageByNumber = (imageNumber: number) =>
  p3Images.find((url) => {
    const filename = url.split('/').pop() ?? ''
    return parseInt(filename.replace(/\.[^.]+$/, ''), 10) === imageNumber
  })

const p4ImageModules = import.meta.glob('../assets/project/p4/*.{jpg,jpeg,JPG,JPEG,png,PNG}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const p4Images = Object.entries(p4ImageModules)
  .sort(([leftPath], [rightPath]) => getImageNumber(leftPath) - getImageNumber(rightPath))
  .map(([, url]) => url)

const p4ImageByNumber = (imageNumber: number) =>
  p4Images.find((url) => {
    const filename = url.split('/').pop() ?? ''
    return parseInt(filename.replace(/\.[^.]+$/, ''), 10) === imageNumber
  })

const p5ImageModules = import.meta.glob('../assets/project/p5/*.{jpg,jpeg,JPG,JPEG,png,PNG}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const p5Images = Object.entries(p5ImageModules)
  .sort(([leftPath], [rightPath]) => getImageNumber(leftPath) - getImageNumber(rightPath))
  .map(([, url]) => url)

const p5ImageByNumber = (imageNumber: number) =>
  p5Images.find((url) => {
    const filename = url.split('/').pop() ?? ''
    return parseInt(filename.replace(/\.[^.]+$/, ''), 10) === imageNumber
  })

const p8ImageModules = import.meta.glob('../assets/project/p8/*.{jpg,jpeg,JPG,JPEG,png,PNG}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const p8Images = Object.entries(p8ImageModules)
  .sort(([leftPath], [rightPath]) => getImageNumber(leftPath) - getImageNumber(rightPath))
  .map(([, url]) => url)

const p8ImageByNumber = (imageNumber: number) =>
  p8Images.find((url) => {
    const filename = url.split('/').pop() ?? ''
    return parseInt(filename.replace(/\.[^.]+$/, ''), 10) === imageNumber
  })

const p10ImageModules = import.meta.glob('../assets/project/p10/*.{jpg,jpeg,JPG,JPEG,png,PNG}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const p10Images = Object.entries(p10ImageModules)
  .sort(([leftPath], [rightPath]) => getImageNumber(leftPath) - getImageNumber(rightPath))
  .map(([, url]) => url)

const p10ImageByNumber = (imageNumber: number) =>
  p10Images.find((url) => {
    const filename = url.split('/').pop() ?? ''
    return parseInt(filename.replace(/\.[^.]+$/, ''), 10) === imageNumber
  })

export type WorkSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
  image?: string
}

export type WorkDetailData = {
  id: number
  title: string
  intro: string
  image: string
  ctaText: string
  sections: WorkSection[]
  slideshowImages?: string[]
}

const defaultImages = [work1, work2, work3, work4, work5, work6, work7, work8, work9, work10]

const firstWork: WorkDetailData = {
  id: 1,
  title: '智能導盲磚安全出行計劃',
  intro:
    '本計劃結合導盲磚、白手杖與 STEAM（micro:bit）技術，提升視障人士在社區通行時的安全與暢順度，同時提升公眾對導盲磚正確使用方式的重視。',
  image: p1Main,
  ctaText: 'GET STARTED',
  sections: [
    {
      title: '組員',
      paragraphs: ['鄺虹如、羅巧芝、廖婉晴、廖婉曦']
    },
    {
      title: '目標',
      paragraphs: [
        '人們逐漸意識到導盲磚對視障人士的重要性，並開始遵循正確的使用方法，不再隨意濫用導盲磚，從而令視障人士的通道暢通無阻。'
      ],
      image: p1Section2
    },
    {
      title: '對象',
      paragraphs: [
        '我們的設計主要針對視障人士，旨在為他們的旅程提供順暢的體驗。',
        '視障人士在香港的人口中佔比 2.7%，是一個不可忽視的群體。他們通常會使用白手杖、導盲犬和導盲磚等輔助工具。除了日常的歧視問題外，我們觀察到許多人因為過於放鬆而踩在導盲磚上，給視障人士帶來困擾。尤其在下雨天，地面潮濕，導盲磚的膠質材料更容易造成滑倒風險。'
      ],
      image: p1Section3
    },
    {
      title: '計劃簡介',
      paragraphs: [
        '我們的設計結合了導盲磚、白手杖和 STEAM（micro:bit）技術。當使用者的白手杖觸碰到導盲磚時，導盲磚上的 micro:bit 將亮起，提醒其他行人有視障人士使用該通道，以促使他們讓路。',
        '另外，與一般的導盲磚不同，我們的設計採用了防滑材料，特別是在下雨天，能夠降低滑倒風險，進一步保障使用者的安全。這項設計旨在讓視障人士的旅程更加順暢並確保他們的安全。'
      ],
      image: p1Section4
    }
  ]
}

const secondWork: WorkDetailData = {
  id: 2,
  title: '社區期間限定二次元甜品店',
  intro:
    '透過社區期間限定二次元甜品店，為參加者提供發揮創意、追逐夢想和擴闊社交圈子的平台，並在設計、佈置、試驗與實踐中建立自信、溝通能力與同理心。',
  image: p2ImageByNumber(71) ?? defaultImages[1],
  ctaText: 'GET STARTED',
  slideshowImages: p2Images.filter((url) => {
    const filename = url.split('/').pop() ?? ''
    const imageNumber = parseInt(filename.replace(/\.[^.]+$/, ''), 10)
    return ![71, 11, 24, 35, 37, 46].includes(imageNumber)
  }),
  sections: [
    {
      title: '組員',
      paragraphs: ['郭歡儀、周楚蕎、李麗旋、梁焯琪']
    },
    {
      title: '目標',
      paragraphs: [
        '通過開始社區期間限定二次元甜品店，為參加者提供一個發揮創意，追逐夢想和擴闊社交圈子的平台，同時培養參加者的自信心，溝通能力及同理心，並讓參加者從設計、佈置、試驗和實踐中了解到社區各階層人士，亦可以發掘自己的潛能，跳出傳統學習的思想，踏出自己的舒適圈。參加者可以藉着這個活動了解自己的職業導向，體驗成為甜品店員的兩日，確立未來就業方向。'
      ],
      image: p2ImageByNumber(11)
    },
    {
      title: '對象',
      paragraphs: [],
      bullets: ['六位中學二年級至中學五年級的學生', '熱愛甜品'],
      image: p2ImageByNumber(24)
    },
    {
      title: '計劃簡介',
      paragraphs: [
        '把社區中心天台與廚房相連的部份裝飾成期間限定文青二次元甜品店，以貼地價錢售賣手作曲奇，蛋糕及手搖飲品，並設置與情緒和二次元有關的文青「打卡點」，吸引社區青少年來臨。同時提供一個演出的機會，讓社區青少年勇於表達自我。參加者在與客人溝通時，可以更了解社區以及身邊同齡人的想法，培養自信心。參加者以及本組組員會 cosplay 為二次元角色，並歡迎客人 cosplay，鼓勵青少年將內心的想法和興趣勇敢表達出來。'
      ],
      image: 'http://localhost:5173/src/assets/project/p2/50.jpeg'
    },
    {
      title: '計劃內容',
      paragraphs: [
        '二次元元素：為鼓勵青少年踏出自己的舒適圈，每一位 cosplay 的顧客將獲贈一份曲奇。',
        '情緒問題：我們會提供心聲牆，讓青少年抒發情緒。',
        '表演平台：我們會在特定時段開放「舞台」供顧客和社區青少年演出。'
      ],
      image: p2ImageByNumber(37)
    },
    {
      title: 'AI 元素',
      paragraphs: [
        '1. 食譜：運用 AI 軟件 Poe 搜尋食譜。',
        '2. 特飲：運用 AI 軟件 Poe 設計代表不同情緒的特飲，按照客人情緒調配。「人生特飲」以雪碧／益力多／氣泡水為基底，會根據客人的情緒使用食材，例如：傷心＝藍色＝藍莓，開心＝黃色＝百香果，憤怒＝紅色＝草莓等。希望可以利用製作一杯飲品的時間，與對方進行一次心靈溝通。'
      ],
      image: p2ImageByNumber(46)
    }
  ]
}

const thirdWork: WorkDetailData = {
  id: 3,
  title: '社區藝術創作與尋寶計劃',
  intro:
    '透過社交互動開展藝術創作及團隊合作尋寶活動，打破青年之間的陌生感，重新連結社區關係，找回社區活力與溫暖。',
  image: p3ImageByNumber(1) ?? defaultImages[2],
  ctaText: 'GET STARTED',
  slideshowImages: p3Images.filter((url) => {
    const filename = url.split('/').pop() ?? ''
    const imageNumber = parseInt(filename.replace(/\.[^.]+$/, ''), 10)
    return ![1, 2, 3, 4, 5].includes(imageNumber)
  }),
  sections: [
    {
      title: '組員',
      paragraphs: ['郭浩賢、朱俊熙、江卓暔、岑樂天']
    },
    {
      title: '目標',
      paragraphs: [
        '社交互動開展藝術創作、考驗團隊合作的尋寶活動，打破青年間的陌生感。 過去幾年，疫情限制了人們的出行。大家減少外出，不再頻繁參與社區活動，鄰裡間的交流也越來越少。曾經熱鬧的社區 變得冷冷清清，人與人之間的關係逐漸疏遠，社區的凝聚力 大不如前。 為了改變這個現狀，我們特此舉辦這場活動，希望帶領大家 重新認識社區。活動將透過舉辦社區藝術創作、考驗團隊合 作的尋寶活動，讓大家深入了解社區的每個角落，認識更多 的鄰居。我們希望藉由這次活動，拉近人與人之間的距離，找 回曾經的社區活力與溫暖。'
      ],
      image: p3ImageByNumber(2)
    },
    {
      title: '具體目標',
      paragraphs: [
        '過去幾年，疫情限制了人們的出行。大家減少外出，不再頻繁參與社區活動，鄰裡間的交流也越來越少。曾經熱鬧的社區 變得冷冷清清，人與人之間的關係逐漸疏遠，社區的凝聚力 大不如前。 為了改變這個現狀，我們特此舉辦這場活動，希望帶領大家 重新認識社區。'
      ],
      image: p3ImageByNumber(3)
    },
    {
      title: '對象',
      paragraphs: ['本活動面向12-15歲居住在本社區的青年群體'],
      image: p3ImageByNumber(4)
    },
    {
      title: '計劃簡介',
      paragraphs: [
        '活動將透過舉辦社區藝術創作、考驗團隊合作的尋寶活動，讓大家深入了解社區的每個角落，認識更多的鄰居。我們希望藉由這次活動，拉近人與人之間的距離，找回曾經的社區活力與溫暖。'
      ],
      image: p3ImageByNumber(5)
    }
  ]
}

const fourthWork: WorkDetailData = {
  id: 4,
  title: '重拾ME',
  intro:
    '透過「重拾ME」活動，為家長提供專屬空間與時間放鬆，減輕家庭壓力，並重新連結自我與家庭生活。',
  image: p4ImageByNumber(15) ?? defaultImages[3],
  ctaText: 'GET STARTED',
  slideshowImages: p4Images.filter((url) => {
    const filename = url.split('/').pop() ?? ''
    const imageNumber = parseInt(filename.replace(/\.[^.]+$/, ''), 10)
    return ![15, 4, 6, 1, 21].includes(imageNumber)
  }),
  sections: [
    {
      title: '組員',
      paragraphs: ['胡皚盈、卓詩藯、譚芷欣、謝藍']
    },
    {
      title: '目標',
      paragraphs: [
        '1.提供專屬的空間與時間讓家長放鬆',
        '為家長創造一個無壓力的環境，讓他們能夠暫時遠離家庭責任，享受個人時間。',
        '2.提升心理健康',
        '透過me time的安排，幫助家長減輕壓力，提升心理健康與幸福感。',
        '3.幫助家長重拾興趣與愛好',
        '鼓勵家長參加自己喜愛的活動，重新發掘或培養興趣，提升生活的滿足感。',
        '4.增進親子關係',
        '鼓勵家長在享受個人時間後，能更好地投入家庭生活，增進與孩子之間的關係。',
        '5.建立社群支持',
        '促進家長之間的交流和互助，建立一個支持系統，讓他們感受到社群的連結。',
        '6.減少家庭壓力',
        '透過專業的兒童看護服務，減輕家長的負擔，讓他們能夠安心享受屬於自己的時間。'
      ],
      image: p4ImageByNumber(4)
    },
    {
      title: '對象',
      paragraphs: ['K1-P3家長'],
      image: p4ImageByNumber(6)
    },
    {
      title: '計劃簡介',
      paragraphs: [
        '在現今社會中，許多人在組織家庭後，往往將重心放在孩子身上而迫不得而放棄自己的興趣或工作。照顧孩子佔用了他們大多數的時間，導致缺乏「自我時間」（me time），無法放鬆並重拾自我。',
        '為了幫助這些家長，我們決定舉辦「重拾ME」活動，提供一個平台，讓家長能夠暫時放下家庭責任，有空間享受屬於自己的時間，同時利用我們青少年的活力幫助家長放鬆及重拾自我。'
      ],
      image: p4ImageByNumber(1)
    },
    {
      title: '計劃內容',
      paragraphs: [
        '活動分為兩部分：',
        '1.一齊pop！（運動跳操班）',
        '配合當下潮歌，加上活力四射的健康操，與家長一起䆁放多巴胺，放下壓力',
        '2.燙出自我（韓式燙貼工作坊）',
        '家長以自己喜好和風格選擇韓風燙貼，設計專屬環保袋，從選擇自己喜愛的東西開始尋回自我',
        '-另外設托兒班，從與孩子玩桌遊／遊戲的過程中灌輸要幫父母，減少壓力的概念及方式'
      ],
      image: p4ImageByNumber(21)
    }
  ]
}

const fifthWork: WorkDetailData = {
  id: 5,
  title: '關愛獨居長者計劃',
  intro:
    '透過定期探訪、物資支援與互動活動，關注獨居老人的安全與身心需要，減少孤獨感並傳遞尊重與關懷。',
  image: p5ImageByNumber(35) ?? defaultImages[4],
  ctaText: 'GET STARTED',
  slideshowImages: p5Images.filter((url) => {
    const filename = url.split('/').pop() ?? ''
    const imageNumber = parseInt(filename.replace(/\.[^.]+$/, ''), 10)
    return ![35, 29, 9, 18, 15, 25].includes(imageNumber)
  }),
  sections: [
    {
      title: '組員',
      paragraphs: ['簡嘉瑩、呂馨瑜、李沛熙.、韓樂兒']
    },
    {
      title: '目標',
      paragraphs: [
        '確保獨居老人的安全：定期關心他們的居住環境和健康狀況,及時發現並解決潛在的安全隱患。',
        '減少獨居老人的孤獨感：提供陪伴和社交互動,幫助老人克服孤獨,提升生活的滿意度。',
        '展現尊重和關懷:表達對獨居老人經驗和智慧的尊重,讓他們感受到被重視和關懷'
      ],
      image: p5ImageByNumber(29)
    },
    {
      title: '對象',
      paragraphs: ['老人'],
      image: p5ImageByNumber(9)
    },
    {
      title: '計劃簡介',
      paragraphs: [
        '1.招募工工作（大概招募10個人人）',
        '2.送物資',
        '3.坐天星小小輪',
        '4.設計遊戲給老人互相認識',
        '5.做義工'
      ],
      image: p5ImageByNumber(18)
    },
    {
      title: '📸 長者互動時刻',
      paragraphs: ['長者互動與活動過程紀錄。'],
      image: p5ImageByNumber(15)
    },
    {
      title: '🎞️ 義工服務花絮',
      paragraphs: ['義工服務與現場花絮。'],
      image: p5ImageByNumber(25)
    }
  ]
}

const sixthWork: WorkDetailData = {
  id: 6,
  title: 'Let Them Express 情緒支援計劃',
  intro:
    '透過「Let them express」理念，為青少年建立無壓力的表達空間，鼓勵他們勇敢說出感受，提升情緒管理能力與心理健康。',
  image: defaultImages[5],
  ctaText: 'GET STARTED',
  sections: [
    {
      title: '組員',
      paragraphs: ['鄭薏晴、蕭曉琳、余蔚蕘、陳頌雅']
    },
    {
      title: '目標',
      paragraphs: [
        '活動名意思「Let them express」: 我們希望青少年能在沒有壓力的環境中自由表達心聲，這樣就會有人願意傾聽他們的感受。他們不應該壓抑自己的情緒，而是要勇敢地將自己的感受放在首位。 當青少年能夠自由分享情緒時，周圍的人會更容易理解他們，這有助於建立情感聯繫。這不僅能讓他們感受到支持，還能增強自信心和情緒管理能力。鼓勵他們在面對壓力時保持開放態度，尋求健康的情緒處理方式，將有助於他們在成長過程中更加健康和堅韌。',
        '透過各種活動，可以幫助青少年學會有效地面對自己的情緒，並認識到情緒並不一定是壞事。重要的是，他們應該以正當的方法來解決問題，並學會接納和理解自己的情緒。在這個過程中，青少年能夠培養良好的情緒管理能力，這對他們的心理健康至關重要。 此外，青少年應該懂得尋求支持，主動與不同的人傾訴自己的感受和困惑。這不僅能幫助他們減輕心理壓力，還能促進人際關係的建立和增強。他們也可以參與自己喜愛的活動，這樣不僅能夠放鬆心情，還能提升自信心和自我價值感。 尤其對於升中學生而言，面對學業和社交壓力時，保持冷靜顯得尤為重要。學校和家庭可以通過提供必要的支持和資源，幫助他們建立良好的應對策略，從而更好地適應壓力和挑戰。這些措施能夠促進他們的心理健康，並為未來的發展奠定良好的基礎。'
      ]
    },
    {
      title: '對象',
      paragraphs: ['P6-S1小學生']
    },
    {
      title: '計劃簡介',
      paragraphs: [
        '設計情緒盒子',
        '我們計劃購買一些木盒作為情緒盒子，並準備各種顏色的星星紙，每種顏色代表不同的情緒。當青少年感到不開心時，他們可以在星星紙上寫下自己的感受，無論是困擾他們的事情還是值得開心的事情，然後將這些星星紙放入情緒盒子中。',
        '情緒盒子將會是透明的，象徵著情緒不應該被壓抑，而是應該勇敢地表達出來。我們會使用奶油膠來設計這個盒子，增添其吸引力。此外，我們還計劃利用科技，通過3D打印製作一些不同的公仔來裝飾盒子，使其更加生動有趣。這樣，青少年在使用情緒盒子的過程中，能夠感受到創造力的樂趣，加深對情緒的理解。',
        '原因: 情緒盒子提供了一個安全的空間，使青少年能夠自由地表達自己的情緒，無論是快樂、悲傷、憤怒還是焦慮。在這個空間中，他們可以毫無顧慮地分享自己的感受，這對增強心理健康至關重要。',
        '我們鼓勵青少年利用創造力來表達情感，例如通過繪畫、寫作或音樂創作等方式。這不僅能幫助他們釋放情緒，還能促進情緒識別和表達能力的提升。通過這些活動，他們可以更好地理解自己的內心世界，並學會以健康的方式處理情緒。'
      ]
    }
  ]
}

const seventhWork: WorkDetailData = {
  id: 7,
  title: '五感陶藝減壓計劃',
  intro:
    '透過陶藝與五感體驗，幫助兒童在創作中釋放壓力、提升情緒調節能力，並促進心理健康與內在平靜。',
  image: defaultImages[6],
  ctaText: 'GET STARTED',
  sections: [
    {
      title: '組員',
      paragraphs: ['黎懿之 、袁晞怡 、 温珈悠、蔡伊晴']
    },
    {
      title: '目標',
      paragraphs: [
        '兒童因學業和家庭等多方面的壓力，容易產生焦慮、疲憊甚至心理健康問題。陶藝作為一種藝術治療方式，我們結合視覺、觸覺、聽覺、嗅覺與味覺的五感體驗，幫助兒童釋放壓力、專注當下，並促進內在平靜和情緒調節。本計劃旨在通過陶藝創作過程，讓參與者在藝術的陪伴中，體驗減壓的療癒效果，提升心理健康水平。這陶藝活動能夠提供五感與感官整合的全方位放鬆體驗，從而讓兒童在專注與創作中釋放壓力，提高情緒管理能力。'
      ]
    },
    {
      title: '對象',
      paragraphs: []
    },
    {
      title: '計劃簡介',
      paragraphs: [
        '在繁忙的生活中，壓力無處不在，找到合適的方法來放鬆身心非常重要。以下是一些放鬆壓力的方法：',
        '視覺減壓：透過自然觀察和製作陶瓷，增強孩子的觀察能力和情緒表達。',
        '聽覺減壓：利用陶瓷自然聲音創造放鬆環境。',
        '觸覺減壓：提供陶泥讓孩子透過觸摸來放鬆自己。',
        '嗅覺減壓：使用陶泥天然香味讓孩子透過嗅覺放鬆心情。',
        '味覺減壓：透過健康小吃（木糠布甸 ） 和味道活動，讓孩子在享受美味的同時獲得情緒釋放。'
      ]
    }
  ]
}

const eighthWork: WorkDetailData = {
  id: 8,
  title: '懷舊港式減壓車仔麵計劃',
  intro:
    '以懷舊港式主題結合創意擺攤體驗，幫助參與者正視壓力狀況，建立處理壓力的方法，並提升正向情緒。',
  image: p8ImageByNumber(8) ?? defaultImages[7],
  ctaText: 'GET STARTED',
  slideshowImages: p8Images.filter((url) => {
    const filename = url.split('/').pop() ?? ''
    const imageNumber = parseInt(filename.replace(/\.[^.]+$/, ''), 10)
    return ![8, 10, 4, 2, 3, 1].includes(imageNumber)
  }),
  sections: [
    {
      title: '組員',
      paragraphs: ['冼麗瑩、謝碧熒、陳鎧妍、林詩穎、袁迦琪、周希彤']
    },
    {
      title: '目標',
      paragraphs: [
        '1.提升正向情緒體驗',
        '2.讓參與者了解自己的壓力狀況並正視',
        '3.提供處理壓力的建議和途徑'
      ],
      image: p8ImageByNumber(10)
    },
    {
      title: '對象',
      paragraphs: [],
      image: p8ImageByNumber(4)
    },
    {
      title: '計劃簡介',
      paragraphs: [
        '擺攤形式',
        '為了可以加強香港的歸屬感又引起大家的注意力，我們會以懷舊港式為主題來進行手推車車仔麵的計劃，使用黏土同公仔(squishy)方式來運作，在店舖旁邊放一個牌寫我們的口號「麵條的柔韌，情緒的堅韌！」為了加強氣氛，每一個服務員都會戴上圍裙，提供無微不至的服務。'
      ],
      image: p8ImageByNumber(2)
    },
    {
      title: '活動亮點（一）',
      paragraphs: ['懷舊港式主題佈置與攤位互動紀錄。'],
      image: p8ImageByNumber(3)
    },
    {
      title: '活動亮點（二）',
      paragraphs: ['服務流程與參與者現場花絮。'],
      image: p8ImageByNumber(1)
    }
  ]
}

const ninthWork: WorkDetailData = {
  id: 9,
  title: '母愛菜譜記憶計劃',
  intro:
    '透過烹飪與故事分享，讓中老年母親被聆聽與尊重，並結合 AI 菜譜繪本製作，促進跨代溝通與情感連結。',
  image: defaultImages[8],
  ctaText: 'GET STARTED',
  sections: [
    {
      title: '組員',
      paragraphs: ['李汶恩、鍾采靜、黃士媛、林欣蓓、石珮琪、嚴梓莉']
    },
    {
      title: '目標',
      paragraphs: [
        '在節奏急促的現代生活中，中老年母親們經常難以找到傾訴對象去分享她們的日常生活，她們的子女或孫兒有可能因為各種原因而無法有很多時間陪伴她們。根據數據統計顯示，香港大學防止自殺研究中心指出，香港獨居長者的孤獨感得分為5.63分，高於 3 分的臨界值，反映獨居長者感到孤獨的風險平均達至中等程度。所以她們也會經常感到孤單，渴望與仔女聊天。',
        '食物對我們來說是滿足味蕾的享受，但對她們來說，食物是情感與愛的寄託、載體。因此，本次活動希望能提供一個平台讓中老年母親們藉此機會與青少年分享她們的拿手菜，以及訴說背後的動人故事，傳遞愛與溫暖，打破中老年人和年輕人的隔膜。',
        '在小的時候我們都需要母親的陪伴，但長大後我們反而不願意陪伴他們。兒時邊吃著母親製作的飯菜邊說好吃的子女已不能常常在她的身邊，母親們在子女長大後很容易感到落寞，又無法強求子女花很多時間陪伴自己。',
        '這次的計畫我們會在參與者煮菜時，透過聊天訪問為她們製作一本由AI合作設計的菜譜繪本，並送給她們的子女，讓子女們有一個機會了解自己的母親並回憶與母親一起吃飯做菜的時光。'
      ]
    },
    {
      title: '對象',
      paragraphs: []
    },
    {
      title: '計劃簡介',
      paragraphs: [
        '● 為 6 位中老年母親提供一個傾訴和分享的機會，讓她們講述拿手菜背後的故事，感受被傾聽和尊重。',
        '● 通過記錄製作過程和故事，利用人工智能生成獨特菜譜，並匯集成冊，為參與者留下珍貴回憶。',
        '● 讓青少年聆聽故事，體會母愛的深沈與偉大，藉此讓青少年反思自己平常對母親的態度，打破青少年對中老年人的刻版印象，促進不同年齡段之間的交流與互動，讓年輕人品嘗佳餚。',
        '● 透過懷緬治療（對過去事物及經驗的回憶）讓母親抒發寂寞的感覺並重拾煮食給子女的感覺，讓她們覺得自己仍然是被需要的。'
      ]
    }
  ]
}

const tenthWork: WorkDetailData = {
  id: 10,
  title: '城市定向探索計劃',
  intro:
    '透過城市定向活動鼓勵青少年走出舒適圈，提升身心健康、團隊合作與解難能力，並重新建立真實社交連結。',
  image: p10ImageByNumber(1) ?? defaultImages[9],
  ctaText: 'GET STARTED',
  sections: [
    {
      title: '組員',
      paragraphs: ['蘇紫晴、吳凱童、施曉穎、梁芷茵、胡昊泓']
    },
    {
      title: '目標',
      paragraphs: [
        '1. 促進身心健康：透過定向運動，鼓勵青少年參加戶外活動，增強體能與耐力，提升健康水平。',
        '2. 培養探索精神：激發青少年對城市環境的好奇心與探索欲，鼓勵他們主動了解周圍的社區與文化。',
        '3. 提升團隊合作：定向活動通常需要團隊合作，促進青少年之間的互動與合作精神，增強社交能力。'
      ],
      image: p10ImageByNumber(2)
    },
    {
      title: '對象',
      paragraphs: [],
      image: p10ImageByNumber(3)
    },
    {
      title: '計劃簡介（一）',
      paragraphs: [
        '·運用野外定向方式進行活動',
        '·給予參加者運用不同方法去解決任務難關',
        '·使用團隊方式進行合作比賽（2-3組 每組3-5個人）',
        '·主要遊走不同地方',
        '1. 增進地理知識：幫助青少年了解城市的地理環境、重要地標和公共設施，提高其地理素養。',
        '2. 培養解決問題的能力：在定向過程中，青少年需要面對各種挑戰，這能訓練他們的分析能力和應變能力。',
        '3. 促進社會參與：透過活動，鼓勵青少年積極參與社區事務，增強社會責任感和集體意識。',
        '4. 提升自信心：完成定向挑戰能讓青少年獲得成就感，增強自信心，並激勵他們在未來挑戰中勇於嘗試。',
        '這些理念和目的不僅有助於青少年的全面發展，也能促進社區的和諧與進步。'
      ],
      image: p10ImageByNumber(5)
    },
    {
      title: '計劃簡介（二）',
      paragraphs: [
        '● 創辦背景：現今的年輕人經常性使用手機、並且留在家中無所事事，沉迷自己的世界因而欠缺與人的社交技巧，導致難以擴展自己的社交圈子。於是，我們藉着這個方向創辨了一個充滿熱情，活力，以及青春十足的空間給予青少年參加。',
        '● 期望目標：期望青少年可以藉着活動跳出舒適圈、多些交流、認識朋友、擴闊社交圈子、擴闊對社會的視野並共同創造美好的回憶，亦盡興地享受當天的活動過程，將無所事事的一天轉變為充滿青春的一天。',
        '● 背後意義：我們希望參加者在活動能夠放鬆心情、表達自我，藉著活動明白不依賴手機都能夠獲取快樂。在我們反思和統計現今青少年為甚麼沉迷手機，大多數原因都是因為手機輕易獲得快樂和資訊，但網絡世界的快樂只是短暫，而且當中存有太多負面或不良資訊，這些也是青少年在成長時的阻礙。我們希望活動後能讓參加者可以體驗不一樣的快樂，了解自我並突破自己，從而明白自己的優點和缺點，改善沉迷網絡上的氣氛，讓大家反思真正的快樂的所在處。'
      ],
      image: p10ImageByNumber(4)
    }
  ]
}

export const WORK_DETAILS: WorkDetailData[] = defaultImages.map((image, index) => {
  const id = index + 1
  if (id === 1) return firstWork
  if (id === 2) return secondWork
  if (id === 3) return thirdWork
  if (id === 4) return fourthWork
  if (id === 5) return fifthWork
  if (id === 6) return sixthWork
  if (id === 7) return seventhWork
  if (id === 8) return eighthWork
  if (id === 9) return ninthWork
  if (id === 10) return tenthWork

  return {
    id,
    title: `學生社區創新企劃 ${id}`,
    intro:
      '此頁為統一版面範本，之後可直接以 JSON 替換標題、段落、條列與圖片。內容可按個別隊伍的實際活動描述更新。',
    image,
    ctaText: 'GET STARTED',
    sections: [
      {
        title: '計劃目標',
        paragraphs: [
          '說明本企劃希望回應的社區需要，以及參加者在能力、態度或經驗上的學習目標。'
        ]
      },
      {
        title: '目標對象',
        paragraphs: [],
        bullets: [
          '填寫主要服務對象年齡層',
          '填寫預計參與人數與招募方式',
          '填寫篩選條件或優先對象'
        ]
      },
      {
        title: '計劃內容',
        paragraphs: [
          '可拆分為活動流程、執行安排、展示方式與 AI/科技元素等段落。',
          '建議按「準備期 -> 執行期 -> 成果展示」順序整理，方便閱讀與後續更新。'
        ]
      }
    ]
  }
})
