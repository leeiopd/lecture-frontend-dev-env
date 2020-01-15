const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		main: "./src/app.js"
	},
	output: {
		filename: "[name].js",
		path: path.resolve("./dist")
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"] // style-loader를 앞에 추가한다
			},
			{
				test: /\.(png|jpg|svg)$/, // .png 확장자로 마치는 모든 파일
				loader: "url-loader",
				options: {
					publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
					name: "[name].[ext]?[hash]", // 파일명 형식
					limit: 10000
				}
			}
		]
	}
};
