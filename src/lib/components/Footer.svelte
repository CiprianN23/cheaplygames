<footer>
	<div class="footer-content">
		<h3>Cheaply Games</h3>
		<p>Most cheap games.</p>
		<div class="icons">
			<a href="https://twitter.com/cheaply_games" target="_blank">
				<!-- <img src="/icons/twitter-icon.svg" alt="twitter" /> -->
				<div class="i-bi-twitter"></div>
			</a>
			<a href="https://github.com/CiprianN23/cheaplygames" target="_blank" id="github">
				<!-- <img src="/icons/github-icon.svg" alt="github" /> -->
				<div class="i-bi-github"></div>
			</a>
		</div>
	</div>
	<br />

	<div class="footer-bottom">
		<p>
			<a href="/policy">Privacy Policy</a> |
			<a href="/terms">Terms&Conditions</a>
		</p>
		<br />
		<p class="footer-notice">
			This website uses
			<a href="https://apidocs.cheapshark.com/" target="_blank">CheapShark API</a>
		</p>
		<br />
		<p class="footer-notice">
			The prices listed on this site are correct to the best of our knowledge. CheaplyGames offers
			no guarantee on accuracy or availability. Copyrights and trademarks are the property of their
			respective owners. © 2022 CheaplyGames, most cheap games! All rights reserved.
		</p>
	</div>
</footer>

<style>
	.footer-content .icons a:hover {
		color: var(--accent-color);
	}

	footer {
		background: var(--primary-color);
		padding-top: 40px;
		color: var(--primary-text-color);
	}

	.footer-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}

	.footer-content h3 {
		font-size: 2.1rem;
		font-weight: 500;
		text-transform: capitalize;
		line-height: 3rem;
	}

	.footer-content p {
		max-width: 500px;
		margin: 10px auto;
		line-height: 28px;
		font-size: 14px;
		color: var(--primary-text-color);
	}

	.footer-content .icons a {
		display: inline-block;
		font-size: 1.7rem;
		border-radius: 100%;
		line-height: 36px;
		text-align: center;
		font-weight: 600;
		width: 38px;
		margin-right: 10px;
		text-decoration: none;
		color: white;
	}

	.footer-bottom {
		background: #000;
		padding: 20px;
		padding-bottom: 40px;
		text-align: center;
	}

	.footer-bottom p {
		font-size: 14px;
		word-spacing: 2px;
	}
	.footer-bottom p a {
		color: var(--primary-text-color);
		font-size: 12px;
		text-decoration: underline;
	}
	.footer-notice {
		text-align: center;
		text-transform: none;
		font-size: 10px;
	}
</style>
