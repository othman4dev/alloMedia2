import React from "react";
import { useEffect } from "react";
import Header from "../components/Header";



const Dashboard = () => {
const showToast = (message, color) => {
   const toast = document.createElement("div");
   toast.innerText = message;
   toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-direction: row-reverse;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
   `;

   if (color === "green") {
      toast.innerHTML += `<i class="bi bi-check-circle-fill"></i>`;
      toast.style.backgroundColor = "#def7ec";
      toast.style.color = "#046c4e";
   } else if (color === "red") {
      toast.innerHTML += ` <i class="bi bi-x-circle-fill"></i>`;
      toast.style.backgroundColor = "#f7dede";
      toast.style.color = "#6c0404";
   }

   document.body.appendChild(toast);

   setTimeout(() => {
      toast.style.opacity = "1";
   }, 100);

   setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
         document.body.removeChild(toast);
      }, 500);
   }, 5000);
};

useEffect(() => {
   if (!sessionStorage.getItem('user')) {
      window.location.href = "http://localhost:3000/login?popup=You%20should%20login%20first&color=red";
      return;
   }
   const params = new URLSearchParams(window.location.search);
   const message = params.get("popup");
   const color = params.get("color");

   if (message && (color === "red" || color === "green")) {
      showToast(message, color);
   }
}, []);
  return (
    <body>
   <Header />
   <section id="hero">

	   <div class="row">

		   <div class="twelve columns">

			   <div class="hero-text">
				   <h1 class="responsive-headline">The perfect template to showcase your awesome product and service.</h1>

				   <p>Aenean condimentum, lacus sit amet luctus lobortis, dolores et quas molestias excepturi
               enim tellus ultrices elit, amet consequat enim elit noneas sit amet luctu.
               Quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>
			   </div>

            <div class="buttons">
               <a class="button trial" href="#">Free Trial</a>
               <a class="button learn-more smoothscroll" href="#features">Learn More</a>
            </div>

            <div class="hero-image">
               <img src="images/hero-image.png" alt="" />
            </div>

		   </div>

	   </div>

   </section>
   <section id="styles" style={{ padding: "90px 0 72px", background: "#fff" }}>

      <div class="row section-head">

         <h1>Style Guide.</h1>

         <p class="lead add-bottom">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditipraesentium voluptatum
         deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.
         At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.
         </p>                 

      </div>

      <div class="row add-bottom">

      	<hr/> 

         <div class="six columns add-bottom">

            <h3>Paragraph and Image</h3>

            <p><a href="#"><img width="120" height="120" class="pull-left" alt="sample-image" src="images/sample-image.jpg"/></a>
  			   Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec libero. Suspendisse bibendum.
  			   Cras id urna. Morbi tincidunt, orci ac convallis aliquam, lectus turpis varius lorem, eu
  			   posuere nunc justo tempus leo. Donec mattis, purus nec placerat bibendum, dui pede condimentum
  			   odio, ac blandit ante orci ut diam. Cras fringilla magna. Phasellus suscipit, leo a pharetra
  			   condimentum, lorem tellus eleifend magna, eget fringilla velit magna id neque.
  			   posuere nunc justo tempus leo. </p>

            <p>A <a href="#">link</a>,
  			   <abbr title="this really isn't a very good description">abbrebation</abbr>,
  			   <strong>strong text</strong>,
            <em>em text</em>,
  			   <del>deleted text</del>, and
            <mark>this is a mark text.</mark>
          	</p>

         </div>

         <div class="six columns add-bottom">

            <h3>Drop Caps</h3>

            <p class="drop-cap">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
            Semantics, a large language ocean. A small river named Duden flows by their place and supplies
            it with the necessary regelialia. Morbi tincidunt, orci ac convallis aliquam, lectus turpis varius lorem, eu
  			   posuere nunc justo tempus leo. Donec mattis, purus nec placerat bibendum, dui pede condimentum
  			   odio, ac blandit ante orci ut diam. Cras fringilla magna. Phasellus suscipit, leo a pharetra
  			   condimentum, lorem tellus eleifend magna, eget fringilla velit magna id neque.
  			   </p>

            <h3>Small Print</h3>

            <p>Buy one widget, get one free!
  				<small>(While supplies last. Offer expires on the vernal equinox. Not valid in Ohio.)</small>
  			   </p>

         </div>

         <hr />

      </div>

      <div class="row add-bottom">

         <div class="six columns add-bottom">

            <h3>Pull Quotes</h3>

            <aside class="pull-quote">
    			   <blockquote>
    				   <p>It is a paradisematic country, in which roasted parts of
                  sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind
                  texts it is an almost unorthographic life One day however a small line of blind text by the name
                  of Lorem Ipsum decided to leave for the far World of Grammar.</p>
    				</blockquote>
    			</aside>

         </div>

         <div class="six columns add-bottom">

            <h3>Block Quotes</h3>

            <blockquote cite="http://where-i-got-my-info-from.com">
   			   <p>Your work is going to fill a large part of your life, and the only way to be truly satisfied is
               to do what you believe is great work. And the only way to do great work is to love what you do.
               If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.
               </p>
   				<cite>
   				   <a href="#">Steve Jobs</a>
   				</cite>
			   </blockquote>

            <blockquote>
               <p>Good design is as little design as possible.</p>
               <cite>Dieter Rams</cite>
            </blockquote>

         </div>

         <hr />

      </div>
      <div class="row add-bottom">

         <div class="eight columns add-bottom">

            <h3 class="add-bottom">Definition Lists</h3>

            <h5>a) Multi-line Definitions (default)</h5>

            <dl>
			      <dt><b>This is a term</b></dt>
				      <dd>this is the definition of that term, which both live in a <code>dl</code>.</dd>
			      <dt><b>Another Term</b></dt>
				      <dd>And it gets a definition too, which is this line</dd>
				      <dd>This is a 2<sup>nd</sup> definition for a single term. A <code>dt</code> may be followed by multiple <code>dd</code>s.</dd>
		      </dl>

            <h5>b) Inline Definitions</h5>

            <dl class="lining">
			      <dt><b>This is a term</b></dt>
				      <dd>this is the definition of that term, which both live in a <code>dl</code>.</dd>
			      <dt><b>Another Term</b></dt>
				      <dd class="micro">And it gets a definition too, which is this line</dd>
				      <dd class="micro"> this is a 2<sup>nd</sup> definition for a single term.</dd>
			      <dt><b>Term</b></dt>
			      <dt><b>Other Defined Term</b></dt>
				      <dd><code>dt</code> terms may stand on their own without an accompanying <code>dd</code>, but in that case they <em>share</em> descriptions with the next available <code>dt</code>. You may not have a <code>dd</code> without a parent <code>dt</code>.</dd>
		      </dl>

            <h5>c) Dictionary-style Definition</h5>

            <dl class="dictionary-style">
				   <dt><b>This is a term</b></dt>
					   <dd>this is the definition of that term, which both live in a <code>dl</code>.</dd>
					<dt><b>Another Term</b></dt>
					   <dd>And it gets a definition too, which is this line</dd>
					   <dd> this is a 2<sup>nd</sup> definition for a single term.</dd>
					<dt><b>Term</b></dt>
					<dt><b>Other Defined Term</b></dt>
					   <dd><code>dt</code> terms may stand on their own without an accompanying <code>dd</code>, but in that case they <em>share</em> descriptions with the next available <code>dt</code>. You may not have a <code>dd</code> without a parent <code>dt</code>.</dd>
				</dl>

         </div>

         <div class="four columns add-bottom">

            <h3>Example Lists</h3>

            <ol>
				   <li>Here is an example</li>
				   <li>of an ordered list</li>
			   </ol>

            <ul class="disc">
				   <li>Here is an example</li>
				   <li>of an unordered list</li>
			   </ul>

            <h3>Stats Tabs</h3>

            <ul class="stats-tabs">
			      <li><a href="#">1,234 <b>Sasuke</b></a></li>
			      <li><a href="#">567 <b>Hinata</b></a></li>
			      <li><a href="#">23,456 <b>Naruto</b></a></li>
			      <li><a href="#">3,456 <b>Kiba</b></a></li>
			      <li><a href="#">456 <b>Shikamaru</b></a></li>
			      <li><a href="#">26 <b>Sakura</b></a></li>
		      </ul>

            <h3>Headers</h3>

            <h1>H1 Heading</h1>
            <h2>H2 Heading</h2>
            <h3>H3 Heading</h3>
            <h4>H4 Heading</h4>
            <h5>H5 Heading</h5>
            <h6>H6 Heading</h6>

            <hr/>

            <h3>button</h3>

            <a class="button" href="#">This is a button</a>

         </div>

         <hr />

      </div>

      <div class="row add-bottom">

         <div class="twelve columns add-bottom">

            <h3 class="add-bottom">Pagination</h3>

            <nav class="pagination add-bottom">

               <span class="page-numbers prev inactive">Prev</span>
   	         <span class="page-numbers current">1</span>
   	         <a href="#" class="page-numbers">2</a>
               <a href="#" class="page-numbers">3</a>
               <a href="#" class="page-numbers">4</a>
               <a href="#" class="page-numbers">5</a>
               <a href="#" class="page-numbers">6</a>
               <a href="#" class="page-numbers">7</a>
               <a href="#" class="page-numbers">8</a>
               <a href="#" class="page-numbers">9</a>
   	         <a href="#" class="page-numbers next">Next</a>

		      </nav>

         </div>

         <hr />

      </div>

      {/* <!-- <div class="row add-bottom">

         <div class="twelve columns add-bottom">

            <h3>Form Styles</h3>

            <form>
               <fieldset>

					   <label for="regularInput">Regular Input</label>
						<input type="text" id="regularInput">

                  <label for="regularTextarea">Regular Textarea</label>
						<textarea id="regularTextarea"></textarea>

                  <label for="selectList">Select List</label>
						<select id="selectList">
						   <option value="Option 1">Option 1</option>
							<option value="Option 2">Option 2</option>
							<option value="Option 3">Option 3</option>
							<option value="Option 4">Option 4</option>
						</select>

                  <fieldset>
						   <legend>Checkboxes</legend>

                     <label for="regularCheckbox">
							   <input type="checkbox" value="checkbox 1" id="regularCheckbox">
								<span>Regular Checkbox</span>
							</label>

                     <label for="secondRegularCheckbox">
							   <input type="checkbox" value="checkbox 2" id="secondRegularCheckbox">
								<span>Regular Checkbox</span>
							</label>
						</fieldset>

						<fieldset>
						   <legend>Radio Buttons</legend>

                     <label for="regularRadio">
							   <input type="radio" value="radio 1" id="regularRadio" name="radios">
							   <span>Regular Radio</span>
							</label>

                     <label for="secondRegularRadio">
							   <input type="radio" value="radio 2" id="secondRegularRadio" name="radios">
								<span>Regular Radio</span>
							</label>
						</fieldset>

						<button type="submit">Submit Form</button>

               </fieldset>
				</form>

         </div>

         <hr />

      </div> -->    <!-- Row End--> */}

      <div class="row">

         <div class="twelve columns">
            <h3 class="half-bottom">Columns</h3>
         </div>

      </div>

      {/* <!--<h4>1/3 Columns</h4>  --> */}

      <div class="row">

         <div class="four columns">
		      <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. </p>
	      </div>

         <div class="four columns">
		      <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. </p>
	      </div>

         <div class="four columns">
		      <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. </p>
	      </div>

      </div>

      {/* <!--<h4>1/4 Columns</h4>  --> */}

      <div class="row">

         <div class="three columns">
		      <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. Ut dui lectus, ultrices ut, sodales tincidunt,
            viverra sed, nisl. </p>
	      </div>

         <div class="three columns">
		      <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. Ut dui lectus, ultrices ut, sodales tincidunt,
            viverra sed, nisl. </p>
	      </div>

         <div class="three columns">
		      <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. Ut dui lectus, ultrices ut, sodales tincidunt,
            viverra sed, nisl. </p>
	      </div>

         <div class="three columns">
		      <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. Ut dui lectus, ultrices ut, sodales tincidunt,
            viverra sed, nisl. </p>
	      </div>

      </div>

      {/* <!--<h4>1/2 Columns</h4>  --> */}

      <div class="row">

         <div class="six columns">
            <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. </p>
         </div>

         <div class="six columns">
            <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. </p>
         </div>

      </div>

      {/* <!--<h4>2/3 Columns</h4>  --> */}

      <div class="row">

         <div class="eight columns">
            <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor.</p>
         </div>

         <div class="four columns">
            <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. </p>
         </div>

      </div>

      {/* <!--<h4>3/4 Columns</h4>  --> */}

      <div class="row">

         <div class="three columns">
		      <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at. </p>
	      </div>

         <div class="nine columns">
		      <p>Cras aliquet. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor.Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor. Integer faucibus, eros ac molestie placerat, enim tellus varius lacus,
            nec dictum nunc tortor id urna. Suspendisse dapibus ullamcorper pede. Vivamus ligula ipsum,
            faucibus at, tincidunt eget, porttitor non, dolor.</p>
	      </div>

      </div>

   </section>

   <footer>

      <div class="row">         

         <div class="six columns info">

            <div class="footer-logo">
               <a href="#">
                  <img src="images/logo-footer.svg" alt="" />
               </a>
            </div>

            <p>This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
            Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem
            nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
            </p>

         </div>

         <div class="six columns right-cols">

            <div class="row">

               <div class="columns">
                  <h3 class="address">Come Visit</h3>
                  <p>
                  1600 Amphitheatre Parkway<br/>
                  Mountain View, CA<br/>
                  94043 US
                  </p>
               </div>

               <div class="columns">
                  <h3 class="social">socialize</h3>
                  <ul>
                     <li><a href="#">Facebook</a></li>
                     <li><a href="#">Twitter</a></li>
                     <li><a href="#">GooglePlus</a></li>
                  </ul>
               </div>

               <div class="columns last">
                  <h3 class="contact">Contact Us</h3>
                  <ul>
                    <li><a href="tel:6473438234">647.343.8234</a></li>
                    <li><a href="tel:1234567890">123.456.7890</a></li>
                    <li><a href="mailto:someone@woo.com">someone@woosite.com</a></li>
                  </ul>
               </div>

            </div>

         </div>

         <p class="copyright">&copy; 2014 Woo | Design by <a title="Styleshout" href="http://www.styleshout.com/">Styleshout</a></p>

         <div id="go-top">
            <a class="smoothscroll" title="Back to Top" href="#hero"><i class="icon-up-open"></i></a>
         </div>

      </div>

   </footer>
</body>
  );
};

export default Dashboard;
