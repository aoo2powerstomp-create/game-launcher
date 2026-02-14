window.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("game-grid");
    const cards = Array.from(grid.querySelectorAll(".card"));

    // 1. ソートロジック
    // data-updated 属性を Date オブジェクトとして評価し、降順（新しい順）で並び替え
    cards.sort((a, b) => {
        const dateA = new Date(a.getAttribute("data-updated"));
        const dateB = new Date(b.getAttribute("data-updated"));
        return dateB - dateA;
    });

    // 並び替えたカードを DOM に再配置
    cards.forEach(card => grid.appendChild(card));

    // 2. サムネイルの切り替え（カルーセル）ロジック
    cards.forEach(card => {
        const thumbData = card.getAttribute("data-thumbs");
        if (!thumbData) return;

        const thumbs = thumbData.split(",");
        if (thumbs.length <= 1) {
            // 1枚以下の場合はコントロールを隠す
            const controls = card.querySelector(".carousel-controls");
            if (controls) controls.style.display = "none";
            return;
        }

        const img = card.querySelector(".card-thumb");
        const prevBtn = card.querySelector(".prev");
        const nextBtn = card.querySelector(".next");

        let currentIndex = 0;

        const updateThumb = (index) => {
            currentIndex = (index + thumbs.length) % thumbs.length;
            img.style.opacity = "0";
            setTimeout(() => {
                img.src = thumbs[currentIndex];
                img.style.opacity = "1";
            }, 200);
        };

        prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            updateThumb(currentIndex - 1);
        });

        nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            updateThumb(currentIndex + 1);
        });
    });
});
