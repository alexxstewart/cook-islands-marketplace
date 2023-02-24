import Link from 'next/link'
import React from 'react'

import { useUser } from '@auth0/nextjs-auth0/client';
import LoggedInDropDown from './LoggedInDropDown';

const Navbar = () => {

    const { user, error, isLoading } = useUser();

    return (
        <div className='flex flex-row bg-slate-800 justify-between py-2'>
            <ul className='flex flex-row'>
                <li className='text-2xl px-4 text-slate-100'>
                    <Link href='/'>
                        <svg width="270" height="47" viewBox="0 0 270 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M65.1491 1.27273H71.5966L78.4062 17.8864H78.696L85.5057 1.27273H91.9531V26H86.8821V9.90554H86.6768L80.2777 25.8793H76.8246L70.4254 9.84517H70.2202V26H65.1491V1.27273ZM101.452 26.3501C100.269 26.3501 99.2145 26.1449 98.2889 25.7344C97.3632 25.3158 96.6307 24.7 96.0914 23.8871C95.5602 23.0661 95.2946 22.0438 95.2946 20.8203C95.2946 19.79 95.4837 18.9247 95.862 18.2244C96.2404 17.5241 96.7555 16.9607 97.4075 16.5341C98.0595 16.1075 98.8 15.7855 99.6291 15.5682C100.466 15.3509 101.344 15.1979 102.261 15.1094C103.34 14.9967 104.209 14.892 104.869 14.7955C105.529 14.6908 106.008 14.5379 106.306 14.3366C106.604 14.1354 106.753 13.8376 106.753 13.4432V13.3707C106.753 12.6061 106.511 12.0144 106.028 11.5959C105.553 11.1773 104.877 10.968 104 10.968C103.074 10.968 102.338 11.1733 101.79 11.5838C101.243 11.9863 100.881 12.4934 100.704 13.1051L95.9466 12.7188C96.188 11.5919 96.6629 10.6179 97.3713 9.79688C98.0796 8.9678 98.9932 8.33191 100.112 7.8892C101.239 7.43845 102.543 7.21307 104.024 7.21307C105.054 7.21307 106.04 7.33381 106.982 7.57528C107.932 7.81676 108.773 8.19105 109.506 8.69815C110.246 9.20526 110.83 9.85724 111.256 10.6541C111.683 11.4429 111.896 12.3887 111.896 13.4915V26H107.018V23.4283H106.873C106.576 24.0078 106.177 24.5189 105.678 24.9616C105.179 25.3963 104.579 25.7384 103.879 25.9879C103.179 26.2294 102.37 26.3501 101.452 26.3501ZM102.925 22.8004C103.682 22.8004 104.35 22.6515 104.93 22.3537C105.509 22.0478 105.964 21.6373 106.294 21.1222C106.624 20.607 106.789 20.0234 106.789 19.3714V17.4034C106.628 17.508 106.407 17.6046 106.125 17.6932C105.851 17.7737 105.541 17.8501 105.195 17.9226C104.849 17.987 104.503 18.0473 104.157 18.1037C103.811 18.152 103.497 18.1963 103.215 18.2365C102.611 18.325 102.084 18.4659 101.633 18.6591C101.183 18.8523 100.832 19.1139 100.583 19.4439C100.333 19.7659 100.209 20.1683 100.209 20.6513C100.209 21.3516 100.462 21.8868 100.969 22.2571C101.484 22.6193 102.136 22.8004 102.925 22.8004ZM115.887 26V7.45454H120.873V10.6903H121.066C121.404 9.5393 121.972 8.66998 122.769 8.08239C123.566 7.48674 124.483 7.18892 125.521 7.18892C125.779 7.18892 126.057 7.20502 126.355 7.23721C126.652 7.26941 126.914 7.31368 127.139 7.37003V11.9339C126.898 11.8615 126.564 11.7971 126.137 11.7408C125.711 11.6844 125.32 11.6562 124.966 11.6562C124.209 11.6562 123.533 11.8213 122.938 12.1513C122.35 12.4732 121.883 12.924 121.537 13.5036C121.199 14.0831 121.03 14.7512 121.03 15.5078V26H115.887ZM134.459 20.6634L134.471 14.4936H135.22L141.16 7.45454H147.064L139.083 16.7756H137.864L134.459 20.6634ZM129.799 26V1.27273H134.942V26H129.799ZM141.39 26L135.932 17.9226L139.361 14.2884L147.414 26H141.39ZM157.276 26.3622C155.368 26.3622 153.726 25.9759 152.35 25.2031C150.981 24.4223 149.927 23.3196 149.186 21.8949C148.446 20.4621 148.075 18.7678 148.075 16.8118C148.075 14.9041 148.446 13.2299 149.186 11.7891C149.927 10.3482 150.969 9.22538 152.313 8.42045C153.666 7.61553 155.251 7.21307 157.07 7.21307C158.294 7.21307 159.433 7.41027 160.487 7.80469C161.55 8.19105 162.476 8.77462 163.264 9.5554C164.061 10.3362 164.681 11.3182 165.124 12.5014C165.566 13.6766 165.788 15.053 165.788 16.6307V18.0433H150.128V14.8558H160.946C160.946 14.1153 160.785 13.4593 160.463 12.8878C160.141 12.3163 159.695 11.8696 159.123 11.5476C158.56 11.2176 157.904 11.0526 157.155 11.0526C156.374 11.0526 155.682 11.2337 155.078 11.5959C154.483 11.95 154.016 12.429 153.678 13.0327C153.34 13.6283 153.167 14.2924 153.159 15.0249V18.0554C153.159 18.973 153.328 19.7659 153.666 20.4339C154.012 21.102 154.499 21.6172 155.127 21.9794C155.754 22.3416 156.499 22.5227 157.36 22.5227C157.932 22.5227 158.455 22.4422 158.93 22.2812C159.405 22.1203 159.811 21.8788 160.149 21.5568C160.487 21.2348 160.745 20.8404 160.922 20.3736L165.679 20.6875C165.438 21.8305 164.943 22.8286 164.194 23.6818C163.454 24.527 162.496 25.187 161.32 25.6619C160.153 26.1288 158.805 26.3622 157.276 26.3622ZM179.009 7.45454V11.3182H167.84V7.45454H179.009ZM170.376 3.01136H175.519V20.3011C175.519 20.776 175.592 21.1463 175.737 21.4119C175.882 21.6695 176.083 21.8506 176.34 21.9553C176.606 22.0599 176.912 22.1122 177.258 22.1122C177.499 22.1122 177.741 22.0921 177.982 22.0518C178.224 22.0036 178.409 21.9673 178.538 21.9432L179.347 25.7706C179.089 25.8511 178.727 25.9437 178.26 26.0483C177.793 26.161 177.226 26.2294 176.558 26.2536C175.318 26.3018 174.231 26.1368 173.298 25.7585C172.372 25.3802 171.652 24.7926 171.137 23.9957C170.621 23.1989 170.368 22.1927 170.376 20.9773V3.01136ZM182.359 32.9545V7.45454H187.43V10.5696H187.66C187.885 10.0705 188.211 9.56345 188.638 9.04829C189.072 8.52509 189.636 8.09044 190.328 7.74432C191.028 7.39015 191.898 7.21307 192.936 7.21307C194.288 7.21307 195.536 7.56724 196.679 8.27557C197.822 8.97585 198.735 10.0343 199.42 11.451C200.104 12.8596 200.446 14.6264 200.446 16.7514C200.446 18.8201 200.112 20.5668 199.444 21.9915C198.784 23.4081 197.882 24.4827 196.739 25.2152C195.604 25.9396 194.332 26.3018 192.924 26.3018C191.926 26.3018 191.077 26.1368 190.376 25.8068C189.684 25.4768 189.117 25.0623 188.674 24.5632C188.231 24.0561 187.893 23.545 187.66 23.0298H187.503V32.9545H182.359ZM187.394 16.7273C187.394 17.83 187.547 18.7919 187.853 19.6129C188.159 20.4339 188.601 21.0739 189.181 21.5327C189.76 21.9834 190.465 22.2088 191.294 22.2088C192.131 22.2088 192.839 21.9794 193.419 21.5206C193.998 21.0537 194.437 20.4098 194.735 19.5888C195.041 18.7597 195.194 17.8059 195.194 16.7273C195.194 15.6567 195.045 14.715 194.747 13.902C194.449 13.089 194.01 12.4531 193.431 11.9943C192.851 11.5355 192.139 11.3061 191.294 11.3061C190.457 11.3061 189.748 11.5275 189.169 11.9702C188.597 12.4129 188.159 13.0407 187.853 13.8537C187.547 14.6667 187.394 15.6245 187.394 16.7273ZM209.018 1.27273V26H203.875V1.27273H209.018ZM218.427 26.3501C217.244 26.3501 216.189 26.1449 215.263 25.7344C214.338 25.3158 213.605 24.7 213.066 23.8871C212.535 23.0661 212.269 22.0438 212.269 20.8203C212.269 19.79 212.458 18.9247 212.837 18.2244C213.215 17.5241 213.73 16.9607 214.382 16.5341C215.034 16.1075 215.775 15.7855 216.604 15.5682C217.441 15.3509 218.318 15.1979 219.236 15.1094C220.314 14.9967 221.184 14.892 221.844 14.7955C222.504 14.6908 222.983 14.5379 223.281 14.3366C223.578 14.1354 223.727 13.8376 223.727 13.4432V13.3707C223.727 12.6061 223.486 12.0144 223.003 11.5959C222.528 11.1773 221.852 10.968 220.974 10.968C220.049 10.968 219.312 11.1733 218.765 11.5838C218.218 11.9863 217.855 12.4934 217.678 13.1051L212.921 12.7188C213.163 11.5919 213.638 10.6179 214.346 9.79688C215.054 8.9678 215.968 8.33191 217.087 7.8892C218.214 7.43845 219.518 7.21307 220.999 7.21307C222.029 7.21307 223.015 7.33381 223.957 7.57528C224.906 7.81676 225.748 8.19105 226.48 8.69815C227.221 9.20526 227.804 9.85724 228.231 10.6541C228.657 11.4429 228.871 12.3887 228.871 13.4915V26H223.993V23.4283H223.848C223.55 24.0078 223.152 24.5189 222.653 24.9616C222.154 25.3963 221.554 25.7384 220.854 25.9879C220.153 26.2294 219.344 26.3501 218.427 26.3501ZM219.9 22.8004C220.656 22.8004 221.325 22.6515 221.904 22.3537C222.484 22.0478 222.938 21.6373 223.268 21.1222C223.598 20.607 223.763 20.0234 223.763 19.3714V17.4034C223.603 17.508 223.381 17.6046 223.099 17.6932C222.826 17.7737 222.516 17.8501 222.17 17.9226C221.824 17.987 221.478 18.0473 221.131 18.1037C220.785 18.152 220.471 18.1963 220.19 18.2365C219.586 18.325 219.059 18.4659 218.608 18.6591C218.157 18.8523 217.807 19.1139 217.558 19.4439C217.308 19.7659 217.183 20.1683 217.183 20.6513C217.183 21.3516 217.437 21.8868 217.944 22.2571C218.459 22.6193 219.111 22.8004 219.9 22.8004ZM241.24 26.3622C239.341 26.3622 237.707 25.9598 236.338 25.1548C234.978 24.3419 233.932 23.215 233.199 21.7741C232.475 20.3333 232.113 18.6752 232.113 16.7997C232.113 14.9001 232.479 13.2339 233.211 11.8011C233.952 10.3603 235.002 9.23745 236.363 8.43253C237.723 7.61955 239.341 7.21307 241.216 7.21307C242.834 7.21307 244.251 7.50687 245.466 8.09446C246.682 8.68205 247.644 9.5071 248.352 10.5696C249.06 11.6321 249.451 12.8797 249.523 14.3125H244.669C244.533 13.3868 244.17 12.6423 243.583 12.0788C243.003 11.5073 242.243 11.2216 241.301 11.2216C240.504 11.2216 239.808 11.4389 239.212 11.8736C238.624 12.3002 238.166 12.924 237.836 13.745C237.506 14.5661 237.341 15.5601 237.341 16.7273C237.341 17.9105 237.502 18.9167 237.824 19.7457C238.154 20.5748 238.616 21.2067 239.212 21.6413C239.808 22.076 240.504 22.2933 241.301 22.2933C241.888 22.2933 242.416 22.1726 242.882 21.9311C243.357 21.6896 243.748 21.3395 244.054 20.8807C244.368 20.4138 244.573 19.8544 244.669 19.2024H249.523C249.443 20.6191 249.056 21.8667 248.364 22.9453C247.68 24.0159 246.734 24.853 245.527 25.4567C244.319 26.0604 242.891 26.3622 241.24 26.3622ZM261.268 26.3622C259.36 26.3622 257.718 25.9759 256.342 25.2031C254.973 24.4223 253.919 23.3196 253.178 21.8949C252.438 20.4621 252.068 18.7678 252.068 16.8118C252.068 14.9041 252.438 13.2299 253.178 11.7891C253.919 10.3482 254.961 9.22538 256.306 8.42045C257.658 7.61553 259.244 7.21307 261.063 7.21307C262.286 7.21307 263.425 7.41027 264.48 7.80469C265.542 8.19105 266.468 8.77462 267.257 9.5554C268.053 10.3362 268.673 11.3182 269.116 12.5014C269.559 13.6766 269.78 15.053 269.78 16.6307V18.0433H254.12V14.8558H264.938C264.938 14.1153 264.777 13.4593 264.455 12.8878C264.133 12.3163 263.687 11.8696 263.115 11.5476C262.552 11.2176 261.896 11.0526 261.147 11.0526C260.366 11.0526 259.674 11.2337 259.07 11.5959C258.475 11.95 258.008 12.429 257.67 13.0327C257.332 13.6283 257.159 14.2924 257.151 15.0249V18.0554C257.151 18.973 257.32 19.7659 257.658 20.4339C258.004 21.102 258.491 21.6172 259.119 21.9794C259.747 22.3416 260.491 22.5227 261.352 22.5227C261.924 22.5227 262.447 22.4422 262.922 22.2812C263.397 22.1203 263.803 21.8788 264.142 21.5568C264.48 21.2348 264.737 20.8404 264.914 20.3736L269.671 20.6875C269.43 21.8305 268.935 22.8286 268.186 23.6818C267.446 24.527 266.488 25.187 265.313 25.6619C264.146 26.1288 262.797 26.3622 261.268 26.3622Z" fill="white"/>
                            <path d="M75.446 36.5H73.9489C73.8603 36.0694 73.7054 35.6911 73.484 35.3651C73.2667 35.0391 73.0011 34.7654 72.6871 34.544C72.3772 34.3187 72.0331 34.1496 71.6548 34.0369C71.2765 33.9242 70.8821 33.8679 70.4716 33.8679C69.723 33.8679 69.0449 34.0571 68.4371 34.4354C67.8335 34.8137 67.3525 35.3711 66.9943 36.1076C66.6402 36.8441 66.4631 37.7476 66.4631 38.8182C66.4631 39.8887 66.6402 40.7923 66.9943 41.5288C67.3525 42.2653 67.8335 42.8227 68.4371 43.201C69.0449 43.5793 69.723 43.7685 70.4716 43.7685C70.8821 43.7685 71.2765 43.7121 71.6548 43.5994C72.0331 43.4867 72.3772 43.3197 72.6871 43.0984C73.0011 42.873 73.2667 42.5973 73.484 42.2713C73.7054 41.9413 73.8603 41.563 73.9489 41.1364H75.446C75.3333 41.7682 75.1281 42.3337 74.8303 42.8327C74.5324 43.3318 74.1622 43.7564 73.7195 44.1065C73.2768 44.4527 72.7797 44.7163 72.2283 44.8974C71.681 45.0785 71.0954 45.169 70.4716 45.169C69.4171 45.169 68.4794 44.9115 67.6584 44.3963C66.8374 43.8812 66.1914 43.1487 65.7205 42.1989C65.2496 41.2491 65.0142 40.1222 65.0142 38.8182C65.0142 37.5142 65.2496 36.3873 65.7205 35.4375C66.1914 34.4877 66.8374 33.7552 67.6584 33.2401C68.4794 32.7249 69.4171 32.4673 70.4716 32.4673C71.0954 32.4673 71.681 32.5579 72.2283 32.739C72.7797 32.9201 73.2768 33.1857 73.7195 33.5359C74.1622 33.882 74.5324 34.3046 74.8303 34.8036C75.1281 35.2987 75.3333 35.8641 75.446 36.5ZM81.4392 45.1932C80.6021 45.1932 79.8676 44.994 79.2357 44.5955C78.6079 44.1971 78.1169 43.6397 77.7627 42.9233C77.4126 42.2069 77.2375 41.3698 77.2375 40.4119C77.2375 39.446 77.4126 38.6029 77.7627 37.8825C78.1169 37.162 78.6079 36.6026 79.2357 36.2042C79.8676 35.8058 80.6021 35.6065 81.4392 35.6065C82.2763 35.6065 83.0088 35.8058 83.6366 36.2042C84.2685 36.6026 84.7595 37.162 85.1096 37.8825C85.4638 38.6029 85.6409 39.446 85.6409 40.4119C85.6409 41.3698 85.4638 42.2069 85.1096 42.9233C84.7595 43.6397 84.2685 44.1971 83.6366 44.5955C83.0088 44.994 82.2763 45.1932 81.4392 45.1932ZM81.4392 43.9134C82.0751 43.9134 82.5983 43.7504 83.0088 43.4244C83.4193 43.0984 83.7232 42.6697 83.9204 42.1385C84.1176 41.6072 84.2162 41.0317 84.2162 40.4119C84.2162 39.7921 84.1176 39.2146 83.9204 38.6793C83.7232 38.1441 83.4193 37.7114 83.0088 37.3814C82.5983 37.0514 82.0751 36.8864 81.4392 36.8864C80.8033 36.8864 80.2801 37.0514 79.8696 37.3814C79.4591 37.7114 79.1552 38.1441 78.958 38.6793C78.7608 39.2146 78.6622 39.7921 78.6622 40.4119C78.6622 41.0317 78.7608 41.6072 78.958 42.1385C79.1552 42.6697 79.4591 43.0984 79.8696 43.4244C80.2801 43.7504 80.8033 43.9134 81.4392 43.9134ZM91.5827 45.1932C90.7456 45.1932 90.0111 44.994 89.3793 44.5955C88.7514 44.1971 88.2604 43.6397 87.9062 42.9233C87.5561 42.2069 87.381 41.3698 87.381 40.4119C87.381 39.446 87.5561 38.6029 87.9062 37.8825C88.2604 37.162 88.7514 36.6026 89.3793 36.2042C90.0111 35.8058 90.7456 35.6065 91.5827 35.6065C92.4199 35.6065 93.1523 35.8058 93.7802 36.2042C94.4121 36.6026 94.9031 37.162 95.2532 37.8825C95.6074 38.6029 95.7844 39.446 95.7844 40.4119C95.7844 41.3698 95.6074 42.2069 95.2532 42.9233C94.9031 43.6397 94.4121 44.1971 93.7802 44.5955C93.1523 44.994 92.4199 45.1932 91.5827 45.1932ZM91.5827 43.9134C92.2186 43.9134 92.7418 43.7504 93.1523 43.4244C93.5629 43.0984 93.8667 42.6697 94.0639 42.1385C94.2611 41.6072 94.3597 41.0317 94.3597 40.4119C94.3597 39.7921 94.2611 39.2146 94.0639 38.6793C93.8667 38.1441 93.5629 37.7114 93.1523 37.3814C92.7418 37.0514 92.2186 36.8864 91.5827 36.8864C90.9469 36.8864 90.4237 37.0514 90.0131 37.3814C89.6026 37.7114 89.2988 38.1441 89.1016 38.6793C88.9044 39.2146 88.8058 39.7921 88.8058 40.4119C88.8058 41.0317 88.9044 41.6072 89.1016 42.1385C89.2988 42.6697 89.6026 43.0984 90.0131 43.4244C90.4237 43.7504 90.9469 43.9134 91.5827 43.9134ZM99.2874 41.6193L99.2632 39.8565H99.553L103.61 35.7273H105.373L101.05 40.098H100.929L99.2874 41.6193ZM97.9593 45V32.6364H99.384V45H97.9593ZM103.851 45L100.229 40.4119L101.243 39.4219L105.662 45H103.851ZM113.678 32.6364V45H112.181V32.6364H113.678ZM123.055 37.804L121.775 38.1662C121.694 37.9529 121.576 37.7456 121.419 37.5444C121.266 37.3391 121.057 37.1701 120.791 37.0373C120.525 36.9045 120.185 36.8381 119.771 36.8381C119.203 36.8381 118.73 36.9689 118.352 37.2305C117.978 37.488 117.791 37.8161 117.791 38.2145C117.791 38.5687 117.919 38.8484 118.177 39.0536C118.435 39.2589 118.837 39.4299 119.384 39.5668L120.761 39.9048C121.59 40.1061 122.208 40.4139 122.614 40.8285C123.021 41.239 123.224 41.7682 123.224 42.4162C123.224 42.9474 123.071 43.4223 122.765 43.8409C122.463 44.2595 122.041 44.5895 121.497 44.831C120.954 45.0724 120.322 45.1932 119.602 45.1932C118.656 45.1932 117.873 44.9879 117.253 44.5774C116.633 44.1669 116.241 43.5672 116.076 42.7784L117.428 42.4403C117.557 42.9394 117.801 43.3137 118.159 43.5632C118.521 43.8127 118.994 43.9375 119.578 43.9375C120.242 43.9375 120.769 43.7966 121.159 43.5149C121.554 43.2292 121.751 42.8871 121.751 42.4886C121.751 42.1667 121.638 41.897 121.413 41.6797C121.187 41.4583 120.841 41.2933 120.374 41.1847L118.829 40.8224C117.98 40.6212 117.356 40.3093 116.957 39.8867C116.563 39.4601 116.366 38.9268 116.366 38.2869C116.366 37.7637 116.513 37.3009 116.807 36.8984C117.104 36.496 117.509 36.18 118.02 35.9506C118.535 35.7212 119.119 35.6065 119.771 35.6065C120.688 35.6065 121.409 35.8078 121.932 36.2102C122.459 36.6127 122.833 37.1439 123.055 37.804ZM126.793 32.6364V45H125.368V32.6364H126.793ZM132.131 45.2173C131.544 45.2173 131.01 45.1067 130.532 44.8853C130.053 44.6599 129.672 44.3359 129.391 43.9134C129.109 43.4867 128.968 42.9716 128.968 42.3679C128.968 41.8366 129.073 41.406 129.282 41.076C129.491 40.742 129.771 40.4804 130.121 40.2912C130.471 40.102 130.858 39.9612 131.28 39.8686C131.707 39.772 132.135 39.6955 132.566 39.6392C133.129 39.5668 133.586 39.5124 133.936 39.4762C134.291 39.436 134.548 39.3696 134.709 39.277C134.874 39.1844 134.957 39.0234 134.957 38.794V38.7457C134.957 38.1501 134.794 37.6873 134.468 37.3572C134.146 37.0272 133.657 36.8622 133.001 36.8622C132.32 36.8622 131.787 37.0111 131.401 37.3089C131.014 37.6068 130.743 37.9247 130.586 38.2628L129.234 37.7798C129.475 37.2164 129.797 36.7777 130.199 36.4638C130.606 36.1458 131.049 35.9245 131.528 35.7997C132.011 35.6709 132.485 35.6065 132.952 35.6065C133.25 35.6065 133.592 35.6428 133.979 35.7152C134.369 35.7836 134.745 35.9265 135.108 36.1438C135.474 36.3612 135.778 36.6892 136.019 37.1278C136.261 37.5665 136.381 38.1541 136.381 38.8906V45H134.957V43.7443H134.884C134.788 43.9455 134.627 44.1609 134.401 44.3903C134.176 44.6197 133.876 44.8149 133.502 44.9759C133.127 45.1368 132.671 45.2173 132.131 45.2173ZM132.349 43.9375C132.912 43.9375 133.387 43.8268 133.773 43.6055C134.164 43.3841 134.458 43.0984 134.655 42.7482C134.856 42.3981 134.957 42.0298 134.957 41.6435V40.3395C134.896 40.4119 134.763 40.4783 134.558 40.5387C134.357 40.5951 134.123 40.6454 133.858 40.6896C133.596 40.7299 133.341 40.7661 133.091 40.7983C132.846 40.8265 132.646 40.8506 132.494 40.8707C132.123 40.919 131.777 40.9975 131.455 41.1062C131.137 41.2108 130.88 41.3698 130.682 41.5831C130.489 41.7924 130.393 42.0781 130.393 42.4403C130.393 42.9354 130.576 43.3097 130.942 43.5632C131.312 43.8127 131.781 43.9375 132.349 43.9375ZM140.406 39.4219V45H138.982V35.7273H140.358V37.1761H140.479C140.696 36.7053 141.026 36.3269 141.469 36.0412C141.912 35.7514 142.483 35.6065 143.183 35.6065C143.811 35.6065 144.361 35.7353 144.831 35.9929C145.302 36.2464 145.669 36.6328 145.93 37.152C146.192 37.6671 146.323 38.3191 146.323 39.108V45H144.898V39.2045C144.898 38.4761 144.709 37.9086 144.33 37.5021C143.952 37.0916 143.433 36.8864 142.773 36.8864C142.318 36.8864 141.912 36.985 141.553 37.1822C141.199 37.3794 140.92 37.6671 140.714 38.0455C140.509 38.4238 140.406 38.8826 140.406 39.4219ZM152.427 45.1932C151.655 45.1932 150.973 44.998 150.381 44.6076C149.789 44.2132 149.326 43.6578 148.992 42.9414C148.658 42.221 148.491 41.3698 148.491 40.3878C148.491 39.4138 148.658 38.5687 148.992 37.8523C149.326 37.1359 149.791 36.5825 150.387 36.1921C150.983 35.8017 151.671 35.6065 152.452 35.6065C153.055 35.6065 153.532 35.7071 153.882 35.9084C154.237 36.1056 154.506 36.331 154.691 36.5845C154.88 36.834 155.027 37.0393 155.132 37.2003H155.253V32.6364H156.677V45H155.301V43.5753H155.132C155.027 43.7443 154.878 43.9576 154.685 44.2152C154.492 44.4687 154.216 44.6961 153.858 44.8974C153.5 45.0946 153.023 45.1932 152.427 45.1932ZM152.621 43.9134C153.192 43.9134 153.675 43.7644 154.07 43.4666C154.464 43.1648 154.764 42.7482 154.969 42.217C155.174 41.6817 155.277 41.0639 155.277 40.3636C155.277 39.6714 155.176 39.0657 154.975 38.5465C154.774 38.0233 154.476 37.6168 154.082 37.3271C153.687 37.0333 153.2 36.8864 152.621 36.8864C152.017 36.8864 151.514 37.0413 151.111 37.3512C150.713 37.6571 150.413 38.0736 150.212 38.6009C150.015 39.1241 149.916 39.7116 149.916 40.3636C149.916 41.0237 150.017 41.6233 150.218 42.1626C150.423 42.6979 150.725 43.1245 151.123 43.4425C151.526 43.7564 152.025 43.9134 152.621 43.9134ZM166.053 37.804L164.773 38.1662C164.693 37.9529 164.574 37.7456 164.417 37.5444C164.264 37.3391 164.055 37.1701 163.789 37.0373C163.523 36.9045 163.183 36.8381 162.769 36.8381C162.201 36.8381 161.728 36.9689 161.35 37.2305C160.976 37.488 160.789 37.8161 160.789 38.2145C160.789 38.5687 160.917 38.8484 161.175 39.0536C161.433 39.2589 161.835 39.4299 162.382 39.5668L163.759 39.9048C164.588 40.1061 165.206 40.4139 165.612 40.8285C166.019 41.239 166.222 41.7682 166.222 42.4162C166.222 42.9474 166.069 43.4223 165.763 43.8409C165.461 44.2595 165.039 44.5895 164.495 44.831C163.952 45.0724 163.32 45.1932 162.6 45.1932C161.654 45.1932 160.871 44.9879 160.251 44.5774C159.632 44.1669 159.239 43.5672 159.074 42.7784L160.426 42.4403C160.555 42.9394 160.799 43.3137 161.157 43.5632C161.519 43.8127 161.992 43.9375 162.576 43.9375C163.24 43.9375 163.767 43.7966 164.157 43.5149C164.552 43.2292 164.749 42.8871 164.749 42.4886C164.749 42.1667 164.636 41.897 164.411 41.6797C164.185 41.4583 163.839 41.2933 163.372 41.1847L161.827 40.8224C160.978 40.6212 160.354 40.3093 159.956 39.8867C159.561 39.4601 159.364 38.9268 159.364 38.2869C159.364 37.7637 159.511 37.3009 159.805 36.8984C160.102 36.496 160.507 36.18 161.018 35.9506C161.533 35.7212 162.117 35.6065 162.769 35.6065C163.686 35.6065 164.407 35.8078 164.93 36.2102C165.457 36.6127 165.831 37.1439 166.053 37.804Z" fill="white"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33331 14.6667H55V46.3333H3.33331V14.6667ZM6.66667 30C6.66667 28.8954 7.5621 28 8.66667 28H33C34.1046 28 35 28.8954 35 30V37.6667C35 38.7712 34.1046 39.6667 33 39.6667H8.66667C7.5621 39.6667 6.66667 38.7712 6.66667 37.6667V30Z" fill="#B8B8B8"/>
                            <path d="M24.7143 0H33.1053L35 20H23L24.7143 0Z" fill="#D8D8D8"/>
                            <path d="M11.7551 0H18L11.7551 20H0L11.7551 0Z" fill="#D8D8D8"/>
                            <path d="M17.973 0H25L23.375 20H12L17.973 0Z" fill="#D9A04A"/>
                            <path d="M32 0H40.6298L47 20H34.6471L32 0Z" fill="#D9A04A"/>
                            <path d="M40 0H45.8565L58 20H46.5455L40 0Z" fill="#D8D8D8"/>
                            <path d="M12 20C12 23.3137 9.31371 26 6 26C2.68629 26 0 23.3137 0 20C4.28571 20 2.68629 20 6 20C9.31371 20 9.42857 19.9999 12 20Z" fill="#A7A7A7"/>
                            <path d="M11.8481 20.15C11.7685 23.3116 9.18072 25.85 6 25.85C2.81928 25.85 0.231457 23.3116 0.151886 20.15L6 20.15L11.8481 20.15Z" fill="#A7A7A7" stroke="#808080" stroke-width="0.3"/>
                            <path d="M34.8481 20.15C34.7685 23.3116 32.1807 25.85 29 25.85C25.8193 25.85 23.2315 23.3116 23.1519 20.15L29 20.15L34.8481 20.15Z" fill="#A7A7A7" stroke="#808080" stroke-width="0.3"/>
                            <path d="M22.8483 20.15C22.7754 23.3234 20.3972 25.85 17.5 25.85C14.6028 25.85 12.2246 23.3234 12.1517 20.15L17.5 20.15L22.8483 20.15Z" fill="#B67C24" stroke="#9A6C27" stroke-width="0.3"/>
                            <path d="M46.8481 20.15C46.7685 23.3116 44.1807 25.85 41 25.85C37.8193 25.85 35.2315 23.3116 35.1519 20.15L41 20.15L46.8481 20.15Z" fill="#B67C24" stroke="#9A6C27" stroke-width="0.3"/>
                            <path d="M57.8483 20.15C57.7754 23.3234 55.3972 25.85 52.5 25.85C49.6028 25.85 47.2246 23.3234 47.1517 20.15L52.5 20.15L57.8483 20.15Z" fill="#A7A7A7" stroke="#808080" stroke-width="0.3"/>
                            <mask id="path-15-inside-1_0_1" fill="white">
                            <path d="M40 29C40 28.4477 40.4477 28 41 28H51C51.5523 28 52 28.4477 52 29V46H40V29Z"/>
                            </mask>
                            <path d="M40 29C40 28.4477 40.4477 28 41 28H51C51.5523 28 52 28.4477 52 29V46H40V29Z" fill="#DE3D3D"/>
                            <path d="M39.8 29C39.8 28.3373 40.3373 27.8 41 27.8H51C51.6627 27.8 52.2 28.3373 52.2 29L51.8 29C51.8 28.5582 51.4418 28.2 51 28.2H41C40.5582 28.2 40.2 28.5582 40.2 29L39.8 29ZM52 46H40H52ZM39.8 46V29C39.8 28.3373 40.3373 27.8 41 27.8L41 28.2C40.5582 28.2 40.2 28.5582 40.2 29V46H39.8ZM51 27.8C51.6627 27.8 52.2 28.3373 52.2 29V46H51.8V29C51.8 28.5582 51.4418 28.2 51 28.2L51 27.8Z" fill="#838383" mask="url(#path-15-inside-1_0_1)"/>
                            <circle cx="49" cy="37" r="1" fill="#D9D9D9"/>
                        </svg>
                    </Link>
                </li>
                <li className='text-2xl px-4 text-slate-100'>
                    <Link href='/posts'>Posts</Link>
                </li>
            </ul>

            <div className='mr-2'>
                {!user && (<Link href='/api/auth/login' className='p-2 mx-2 bg-sky-600 rounded-md hover:bg-sky-400'>Log in</Link>)}
                {user && (
                    <>
                        <Link href='/posts/new' className='px-2 py-2 mx-2 bg-green-600 rounded-md hover:bg-green-500'>New Listing</Link>
                        <LoggedInDropDown />
                    </>
                )} 
            </div>
        </div>
    )
}

export default Navbar