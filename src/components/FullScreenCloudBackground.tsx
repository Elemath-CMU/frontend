function FullScreenCloudBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="font-mali h-screen w-screen relative bg-[#CFE1F9]">
      <div className="h-1/2 w-full bg-linear-to-b from-[#FFF1F6] to-[#CFE1F9]" />
      <svg viewBox="0 0 917 330" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full absolute bottom-0">
        <path d="M0 122H917V258H0V122Z" fill="white" fillOpacity="0.5" />
        <path d="M710 144C710 188.183 674.183 224 630 224C585.817 224 550 188.183 550 144C550 99.8172 585.817 64 630 64C674.183 64 710 99.8172 710 144Z" fill="white" fillOpacity="0.5" />
        <path d="M180 112C180 161.706 139.706 202 90 202C40.2944 202 0 161.706 0 112C0 62.2944 40.2944 22 90 22C139.706 22 180 62.2944 180 112Z" fill="white" fillOpacity="0.5" />
        <path d="M917 122C917 166.183 881.183 202 837 202C792.817 202 757 166.183 757 122C757 77.8172 792.817 42 837 42C881.183 42 917 77.8172 917 122Z" fill="white" fillOpacity="0.5" />
        <g filter="url(#filter0_d_45_557)">
          <path d="M0 71C66.8264 71 121 125.174 121 192H0V71Z" fill="white" />
          <path d="M171 160C171 184.853 150.853 205 126 205C101.147 205 81 184.853 81 160C81 135.147 101.147 115 126 115C150.853 115 171 135.147 171 160Z" fill="white" />
          <path d="M259 145C259 178.137 232.137 205 199 205C165.863 205 139 178.137 139 145C139 111.863 165.863 85 199 85C232.137 85 259 111.863 259 145Z" fill="white" />
          <path d="M347 171C347 204.137 320.137 231 287 231C253.863 231 227 204.137 227 171C227 137.863 253.863 111 287 111C320.137 111 347 137.863 347 171Z" fill="white" />
          <path d="M438 145C438 178.137 411.137 205 378 205C344.863 205 318 178.137 318 145C318 111.863 344.863 85 378 85C411.137 85 438 111.863 438 145Z" fill="white" />
          <path d="M519 155C519 188.137 492.137 215 459 215C425.863 215 399 188.137 399 155C399 121.863 425.863 95 459 95C492.137 95 519 121.863 519 155Z" fill="white" />
          <path d="M917 71C850.174 71 796 125.174 796 192H917V71Z" fill="white" />
          <path d="M749 170C749 194.853 769.147 215 794 215C818.853 215 839 194.853 839 170C839 145.147 818.853 125 794 125C769.147 125 749 145.147 749 170Z" fill="white" />
          <path d="M666 155C666 188.137 692.863 215 726 215C759.137 215 786 188.137 786 155C786 121.863 759.137 95 726 95C692.863 95 666 121.863 666 155Z" fill="white" />
          <path d="M570 171C570 204.137 596.863 231 630 231C663.137 231 690 204.137 690 171C690 137.863 663.137 111 630 111C596.863 111 570 137.863 570 171Z" fill="white" />
          <path d="M479 145C479 178.137 505.863 205 539 205C572.137 205 599 178.137 599 145C599 111.863 572.137 85 539 85C505.863 85 479 111.863 479 145Z" fill="white" />
          <rect y="151" width="917" height="178.947" fill="white" />
        </g>
        <defs>
          <filter id="filter0_d_45_557" x="-10" y="16" width="937" height="320" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="-4" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.776471 0 0 0 0 0.811765 0 0 0 0 0.980392 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_45_557" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_45_557" result="shape" />
          </filter>
        </defs>
      </svg>
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
};

export default FullScreenCloudBackground;
