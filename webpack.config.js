const path = require("path");
const webpack = require("webpack");

// html 웹펙 플러그인
const HtmlWebpackPlugin = require("html-webpack-plugin");

//
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				loader: "url-loader",
				options: {
					name: "[name].[ext]?[hash]",
					limit: 10000 // 10Kb
				}
			}
		]
	},
	/**
	 * TODO: 아래 플러그인을 추가해서 번들 결과를 만들어 보세요.
	 * 1. BannerPlugin: 결과물에 빌드 시간을 출력하세요.
	 * 2. HtmlTemplatePlugin: 동적으로 html 파일을 생성하세요.
	 * 3. CleanWebpackPlugin: 빌드 전에 아웃풋 폴더를 깨끗히 정리하세요.
	 * 4. MiniCssExtractPlugin: 모듈에서 css 파일을 분리하세요.
	 */

	plugins: [
		// new MyPlugin(),
		new webpack.BannerPlugin({
			banner: () => `빌드 날짜: ${new Date().toLocaleString()}`
		}),

		new HtmlWebpackPlugin({
			template: "./src/index.html", // 템플릿 경로를 지정
			templateParameters: {
				// 템플리셍 주입할 파라매터 변수 지정
				env: process.env.NODE_ENV === "development" ? "(개발용)" : ""
			},
			minify:
				process.env.NODE_ENV === "production"
					? {
							collapseWhitespace: true, // 빈칸 제거
							removeComments: true // 주석 제거
					  }
					: false,
			hash: true // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
		}),

		new CleanWebpackPlugin(),

		...(process.env.NODE_ENV === "production"
			? [new MiniCssExtractPlugin({ filename: `[name].css` })]
			: [])
	]
};
