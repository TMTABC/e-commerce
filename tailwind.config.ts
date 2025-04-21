import { type Config } from 'tailwindcss'; // Sử dụng kiểu Config từ TailwindCSS (hỗ trợ TypeScript)

const config: Config = {
    content: [
        // Dò tìm class trong mọi file bên trong các thư mục sau:
        './app/**/*.{js,ts,jsx,tsx,mdx}',         // Tất cả file trong thư mục app/ (App Router)
        './components/**/*.{js,ts,jsx,tsx,mdx}',  // Tất cả file trong thư mục components/
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',     // (Tuỳ chọn) Thư mục src/app/ nếu dự án đặt code trong src
        './src/components/**/*.{js,ts,jsx,tsx,mdx}', // (Tuỳ chọn) Thư mục src/components/ nếu có
    ],
    darkMode: 'class', // Kích hoạt dark mode bằng cách thêm class 'dark' trên <html> (thay vì dùng media query)
    theme: {
        extend: {
            colors: {
                // Thêm màu sắc tuỳ chỉnh vào theme tại đây
                primary: '#1E40AF',   // ví dụ: màu xanh chủ đạo (primary)
                secondary: '#1FB2A6', // ví dụ: màu phụ (secondary)
            },
            // Có thể mở rộng thêm fontFamily, spacing, v.v... nếu cần
        },
    },
    plugins: [], // Không sử dụng plugin nào (typography, forms, v.v) trong cấu hình này
};

export default config; // Xuất cấu hình để Next.js/TailwindCSS sử dụng
