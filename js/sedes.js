const Sedes = {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<div><div class="w3-content w3-container w3-padding-60"><h3 class="w3-center">Universidades para el Bienestar</h3><h4 class="w3-center"><em>Benito Juárez García</em></h4><h1 class="w3-center">Sedes</h1></div><div class="w3-content w3-container w3-padding-64"><div class="w3-hide w3-responsive w3-show"><table class="w3-table w3-bordered w3-hoverable"><thead><tr><th>Estado</th><th>Sede</th><th>Carrera</th><th>Clave de la Institución</th><th>Clave Dirección General de Profesiones</th></tr></thead><tbody class="w3-text-dark-gray"><tr><td>AGUASCALIENTES</td><td>ASIENTOS</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>010129</td><td>575304</td></tr><tr><td>AGUASCALIENTES</td><td>CALVILLO</td><td>INGENIERÍA AMBIENTAL PARA LA SUSTENTABILIDAD</td><td>010130</td><td>575303</td></tr><tr><td>BAJA CALIFORNIA</td><td>ENSENADA, SAN QUINTIN</td><td>INGENIERÍA EN ACUACULTURA Y PISCICULTURA</td><td>020243</td><td>128314</td></tr><tr><td>CAMPECHE</td><td>CALAKMUL</td><td>LICENCIATURA EN PATRIMONIO HISTÓRICO, CULTURAL Y NATURAL</td><td>040100</td><td>671341</td></tr><tr><td>CAMPECHE</td><td>CALKINÍ</td><td>INGENIERÍA EN AGRICULTURA Y AGRONOMÍA</td><td>040101</td><td>574306</td></tr><tr><td>CAMPECHE</td><td>ESCÁRCEGA</td><td>INGENIERÍA AGROFORESTAL</td><td>040102</td><td>302313</td></tr><tr><td>CHIAPAS</td><td>CHENALHÓ</td><td>INGENIERÍA AGROFORESTAL</td><td>070384</td><td>302313</td></tr><tr><td>CHIAPAS</td><td>CHILÓN</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>070383</td><td>575304</td></tr><tr><td>CHIAPAS</td><td>ESCUINTLA</td><td>LICENCIATURA EN ESTUDIOS SOCIALES</td><td>070382</td><td>671342</td></tr><tr><td>CHIAPAS</td><td>OCOSINGO</td><td>LICENCIATURA EN ENFERMERÍA Y OBSTETRICIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>CHIAPAS</td><td>PALENQUE</td><td>LICENCIATURA EN PATRIMONIO HISTÓRICO, CULTURAL Y NATURAL</td><td>070381</td><td>671341</td></tr><tr><td>CHIAPAS</td><td>VENUSTIANO CARRANZA</td><td>LICENCIATURA EN MEDICINA INTEGRAL Y SALUD COMUNITARIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>CHIHUAHUA</td><td>GUADALUPE Y CALVO</td><td>INGENIERÍA EN MINAS Y RESTAURACIÓN AMBIENTAL</td><td>080295</td><td>574316</td></tr><tr><td>CHIHUAHUA</td><td>URIQUE</td><td>INGENIERÍA AMBIENTAL PARA LA SUSTENTABILIDAD</td><td>080293</td><td>575303</td></tr><tr><td>CIUDAD DE MÉXICO</td><td>ÁLVARO OBREGÓN</td><td>LICENCIATURA EN ESTUDIOS SOCIALES</td><td>090879</td><td>671342</td></tr><tr><td>CIUDAD DE MÉXICO</td><td>AZCAPOTZALCO</td><td>LICENCIATURA EN CONTABILIDAD Y ADMINISTRACIÓN PÚBLICA</td><td>090887</td><td>290347</td></tr><tr><td>CIUDAD DE MÉXICO</td><td>CUAUHTÉMOC</td><td>LICENCIATURA EN DERECHO</td><td>090886</td><td>612301</td></tr><tr><td>CIUDAD DE MÉXICO</td><td>IZTACALCO</td><td> LICENCIATURA EN PATRIMONIO HISTÓRICO, INDUSTRIA DE VIAJES Y TURISMO</td><td>090883</td><td>290345</td></tr><tr><td>CIUDAD DE MÉXICO</td><td>IZTAPALAPA</td><td>INGENIERÍA EN GESTIÓN INTEGRADA DEL AGUA</td><td>090884</td><td>342336</td></tr><tr><td>CIUDAD DE MÉXICO</td><td>MAGDALENA CONTRERAS</td><td>INGENIERÍA AGROFORESTAL</td><td>090885</td><td>302313</td></tr><tr><td>CIUDAD DE MÉXICO</td><td>MILPA ALTA</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>090880</td><td>575304</td></tr><tr><td>CIUDAD DE MÉXICO</td><td>TLÁHUAC</td><td>INGENIERÍA EN COMPUTACIÓN</td><td>090878</td><td>510330</td></tr><tr><td>CIUDAD DE MÉXICO</td><td>TLÁHUAC</td><td>INGENIERÍA ELECTROMECÁNICA</td><td>090878</td><td>505345</td></tr><tr><td>CIUDAD DE MÉXICO</td><td>TLALPAN</td><td>LICENCIATURA EN MEDICINA INTEGRAL Y SALUD COMUNITARIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>CIUDAD DE MÉXICO</td><td>XOCHIMILCO</td><td> LICENCIATURA EN FORMACIÓN DOCENTE EN EDUCACIÓN BÁSICA: PATRIMONIO HISTÓRICO Y CULTURAL DE MÉXICO</td><td>090888</td><td>290344</td></tr><tr><td>COAHUILA DE ZARAGOZA</td><td> FRANCISCO I. MADERO</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>050281</td><td>575304</td></tr><tr><td>COAHUILA DE ZARAGOZA</td><td> PIEDRAS NEGRAS</td><td>LICENCIATURA EN ESTUDIOS SOCIALES</td><td>050278</td><td>671342</td></tr><tr><td>COLIMA</td><td>ARMERÍA</td><td>INGENIERÍA EN ACUACULTURA Y PISCICULTURA</td><td>060086</td><td>128314</td></tr><tr><td>DURANGO</td><td>CUENCAMÉ</td><td>INGENIERÍA EN DESARROLLO REGIONAL SUSTENTABLE</td><td>100167</td><td>130306</td></tr><tr><td>DURANGO</td><td>TEPEHUANES</td><td>INGENIERÍA FORESTAL COMUNITARIA</td><td>100168</td><td>331338</td></tr><tr><td>ESTADO DE MÉXICO</td><td>TEXCOCO DE MORA</td><td>INGENIERÍA CIVIL</td><td>150966</td><td>511301</td></tr><tr><td>ESTADO DE MÉXICO</td><td>VILLA DE ALLENDE</td><td>INGENIERÍA EN GESTIÓN INTEGRADA DEL AGUA</td><td>150968</td><td>342336</td></tr><tr><td>ESTADO DE MÉXICO</td><td>VILLA DEL CARBÓN</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>150967</td><td>575304</td></tr><tr><td>GUANAJUATO</td><td>CUERÁMARO</td><td>LICENCIATURA EN MEDICINA VETERINARIA Y ZOOTECNIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>GUANAJUATO</td><td>SAN DIEGO DE LA UNIÓN</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>110445</td><td>575304</td></tr><tr><td>GUERRERO</td><td>ATOYAC DE ÁLVAREZ</td><td>INGENIERÍA AGROFORESTAL</td><td>120231</td><td>302313</td></tr><tr><td>GUERRERO</td><td>JUAN R. ESCUDERO</td><td>LICENCIATURA EN MEDICINA INTEGRAL Y SALUD COMUNITARIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>GUERRERO</td><td>METLATÓNOC</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>120229</td><td>575304</td></tr><tr><td>GUERRERO</td><td>XOCHISTLAHUACA</td><td>INGENIERÍA EN DESARROLLO REGIONAL SUSTENTABLE</td><td>120228</td><td>130306</td></tr><tr><td>HIDALGO</td><td>CHILCUAUTLA</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>130229</td><td>575304</td></tr><tr><td>HIDALGO</td><td>FRANCISCO I. MADERO</td><td> LICENCIATURA EN FORMACIÓN DOCENTE EN EDUCACIÓN BÁSICA: PATRIMONIO HISTÓRICO Y CULTURAL DE MÉXICO</td><td>130227</td><td>290344</td></tr><tr><td>HIDALGO</td><td>HUASCA DE OCAMPO</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>130228</td><td>575304</td></tr><tr><td>JALISCO</td><td>AYOTLÁN</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>140482</td><td>575304</td></tr><tr><td>JALISCO</td><td>TECOLOTLÁN</td><td>INGENIERÍA AMBIENTAL PARA LA SUSTENTABILIDAD</td><td>140481</td><td>575303</td></tr><tr><td>JALISCO</td><td>TOMATLÁN</td><td>INGENIERÍA EN DESARROLLO REGIONAL SUSTENTABLE</td><td>140480</td><td>130306</td></tr><tr><td>MICHOACÁN DE OCAMPO</td><td>ÁPORO</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>160329</td><td>575304</td></tr><tr><td>MICHOACÁN DE OCAMPO</td><td>CHILCHOTA</td><td>LICENCIATURA EN MEDICINA INTEGRAL Y SALUD COMUNITARIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>MICHOACÁN DE OCAMPO</td><td>PAJACUARÁN</td><td>LICENCIATURA EN MEDICINA VETERINARIA Y ZOOTECNIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>MICHOACÁN DE OCAMPO</td><td>TACÁMBARO</td><td> LICENCIATURA EN FORMACIÓN DOCENTE EN EDUCACIÓN BÁSICA: PATRIMONIO HISTÓRICO Y CULTURAL DE MÉXICO</td><td>160327</td><td>290344</td></tr><tr><td>MICHOACÁN DE OCAMPO</td><td>ZACAPU</td><td>CONTABILIDAD Y ADMINISTRACIÓN PÚBLICA</td><td>160331</td><td>290347</td></tr><tr><td>MICHOACÁN DE OCAMPO</td><td>ZACAPU</td><td>INGENIERÍA EN DESARROLLO REGIONAL SUSTENTABLE</td><td>160331</td><td>130306</td></tr><tr><td>MICHOACÁN DE OCAMPO</td><td>ZACAPU</td><td>INGENIERÍA INDUSTRIAL</td><td>160331</td><td>574310</td></tr><tr><td>MICHOACÁN DE OCAMPO</td><td>ZACAPU</td><td>LICENCIATURA EN DERECHO Y ADMINISTRACIÓN PÚBLICA</td><td>160331</td><td>620382</td></tr><tr><td>MORELOS</td><td>AYALA</td><td>LICENCIATURA EN MEDICINA VETERINARIA Y ZOOTECNIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>MORELOS</td><td>TEPOZTLÁN</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>170238</td><td>575304</td></tr><tr><td>MORELOS</td><td>TLALTIZAPÁN</td><td>LICENCIATURA EN PATRIMONIO HISTÓRICO, CULTURAL Y NATURAL</td><td>170237</td><td>671341</td></tr><tr><td>NAYARIT</td><td>LA YESCA</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>180139</td><td>575304</td></tr><tr><td>NUEVO LEÓN</td><td>ANÁHUAC</td><td>INGENIERÌA EN ADMINISTRACIÓN AGROPECUARIA</td><td>190320</td><td>311360</td></tr><tr><td>OAXACA</td><td>ASUNCIÓN NOCHIXTLÁN</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>200256</td><td>575304</td></tr><tr><td>OAXACA</td><td>HUAUTLA DE JIMÉNEZ</td><td>INGENIERÌA EN ADMINISTRACIÓN AGROPECUARIA</td><td>200259</td><td>311360</td></tr><tr><td>OAXACA</td><td>CIUDAD IXTEPEC</td><td>LICENCIATURA EN EXPRESIÓN Y PRODUCCIÓN ARTÍSTICA</td><td>200261</td><td>290346</td></tr><tr><td>OAXACA</td><td>SAN FELIPE JALAPA DE DÍAZ</td><td> LICENCIATURA EN ADMINISTRACIÓN MUNICIPAL Y POLÍTICAS PÚBLICAS</td><td>200225</td><td>671343</td></tr><tr><td>OAXACA</td><td>SAN JUAN BAUTISTA CUICATLÁN</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>200258</td><td>575304</td></tr><tr><td>OAXACA</td><td>SAN JUAN BAUTISTA VALLE NACIONAL</td><td>LICENCIATURA EN MEDICINA INTEGRAL Y SALUD COMUNITARIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>OAXACA</td><td>SAN PEDRO POCHUTLA</td><td>LICENCIATURA EN MEDICINA INTEGRAL Y SALUD COMUNITARIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>OAXACA</td><td>SANTA MARÍA JALAPA DEL MARQUÉS</td><td>LICENCIATURA EN ENFERMERÍA Y OBSTETRICIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>OAXACA</td><td>TLACOLULA DE MATAMOROS</td><td>INGENIERÍA EN DESARROLLO REGIONAL SUSTENTABLE</td><td>200257</td><td>130306</td></tr><tr><td>OAXACA</td><td>VILLA DE TUTUTEPEC</td><td>INGENIERÍA EN BIODIVERSIDAD TROPICAL</td><td>200262</td><td>571343</td></tr><tr><td>OAXACA</td><td>VILLA DE ZAACHILA</td><td>INGENIERÍA EN AGRONOMÍA Y AGRICULTURA</td><td>200260</td><td>311360</td></tr><tr><td>PUEBLA</td><td>CHIAUTZINGO</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>210556</td><td>575304</td></tr><tr><td>PUEBLA</td><td>CUETZALAN DEL PROGRESO</td><td>INGENIERÍA EN DESARROLLO REGIONAL SUSTENTABLE</td><td>210555</td><td>130306</td></tr><tr><td>PUEBLA</td><td>JOPALA</td><td>INGENIERÍA EN GESTIÓN INTEGRADA DEL AGUA</td><td>210557</td><td>342336</td></tr><tr><td>PUEBLA</td><td>ZINACATEPEC</td><td>LICENCIATURA EN MEDICINA INTEGRAL Y SALUD COMUNITARIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>QUERÉTARO</td><td>EZEQUIEL MONTES</td><td>LICENCIATURA EN MEDICINA INTEGRAL Y SALUD COMUNITARIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>QUINTANA ROO</td><td>FELIPE CARRILLO PUERTO</td><td>LICENCIATURA EN PATRIMONIO HISTÓRICO, CULTURAL Y NATURAL</td><td>230139</td><td>671341</td></tr><tr><td>QUINTANA ROO</td><td>LÁZARO CÁRDENAS, KANTUNILKIN</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>230140</td><td>575304</td></tr><tr><td>SAN LUIS POTOSÍ</td><td>AQUISMÓN</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>240201</td><td>575304</td></tr><tr><td>SAN LUIS POTOSÍ</td><td>RAYÓN</td><td>INGENIERÍA AGROFORESTAL</td><td>240200</td><td>302313</td></tr><tr><td>SINALOA</td><td>BADIRAGUATO</td><td>INGENIERÍA FORESTAL COMUNITARIA</td><td>250196</td><td>331338</td></tr><tr><td>SINALOA</td><td>COSALÁ</td><td>INGENIERÍA EN DESARROLLO REGIONAL SUSTENTABLE</td><td>250195</td><td>130306</td></tr><tr><td>SONORA</td><td>AGUA PRIETA</td><td>LICENCIATURA EN ESTUDIOS SOCIALES</td><td>260205</td><td>671342</td></tr><tr><td>SONORA</td><td>ETCHOJOA</td><td>INGENIERÍA EN ACUACULTURA Y PISCICULTURA</td><td>260207</td><td>128314</td></tr><tr><td>SONORA</td><td>GENERAL PLUTARCO ELÍAS CALLES</td><td> LICENCIATURA EN ADMINISTRACIÓN MUNICIPAL Y POLÍTICAS PÚBLICAS</td><td>260208</td><td>671343</td></tr><tr><td>TABASCO</td><td>CÁRDENAS</td><td> INGENIERÍA QUÍMICA EN DESARROLLO DE LA INDUSTRIA PETROLERA</td><td>270169</td><td>556310</td></tr><tr><td>TABASCO</td><td>COMALCALCO</td><td>LICENCIATURA EN DERECHO</td><td>270170</td><td>612301</td></tr><tr><td>TAMAULIPAS</td><td>ALDAMA</td><td>LICENCIATURA EN MEDICINA VETERINARIA Y ZOOTECNIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>TAMAULIPAS</td><td>HIDALGO</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>280281</td><td>575304</td></tr><tr><td>TAMAULIPAS</td><td>SAN FERNANDO</td><td>INGENIERÍA AMBIENTAL PARA LA SUSTENTABILIDAD</td><td>280277</td><td>575303</td></tr><tr><td>TLAXCALA</td><td>CUAPIAXTLA</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>290130</td><td>575304</td></tr><tr><td>TLAXCALA</td><td>XALTOCAN</td><td>INGENIERÍA AMBIENTAL PARA LA SUSTENTABILIDAD</td><td>290131</td><td>575303</td></tr><tr><td>VERACRUZ</td><td>ATLAHUILCO</td><td> LICENCIATURA EN FORMACIÓN DOCENTE EN EDUCACIÓN BÁSICA: PATRIMONIO HISTÓRICO Y CULTURAL DE MÉXICO</td><td>300552</td><td>290344</td></tr><tr><td>VERACRUZ</td><td>COATZACOALCOS</td><td>INGENIERÍA QUÍMICA DE LA INDUSTRIA PETROLERA</td><td>300546</td><td>556310</td></tr><tr><td>VERACRUZ</td><td>HUAYACOCOTLA</td><td>INGENIERÍA EN DESARROLLO REGIONAL SUSTENTABLE</td><td>300551</td><td>130306</td></tr><tr><td>VERACRUZ</td><td>JÁLTIPAN</td><td>INGENIERÍA EN DESARROLLO REGIONAL SUSTENTABLE</td><td>300550</td><td>130306</td></tr><tr><td>VERACRUZ</td><td>MINATITLÁN</td><td>INGENIERÍA Y ADMINISTRACIÓN DE LA INDUSTRIA ENERGÉTICA</td><td>300553</td><td>574308</td></tr><tr><td>VERACRUZ</td><td>PLAYA VICENTE</td><td>LICENCIATURA EN MÚSICA Y LAUDERÍA</td><td>300549</td><td>774362</td></tr><tr><td>VERACRUZ</td><td>POZA RICA DE HIDALGO</td><td>INGENIERÍA EN PROCESOS PETROLEROS</td><td>300547</td><td>574304</td></tr><tr><td>VERACRUZ</td><td>RÍO BLANCO</td><td>INGENIERÍA EN ENERGÍAS RENOVABLES</td><td>300548</td><td>120302</td></tr><tr><td>YUCATÁN</td><td>TICUL</td><td>LICENCIATURA EN MEDICINA INTEGRAL Y SALUD COMUNITARIA</td><td>Dictamen CIFRHS</td><td>Dictamen CIFRHS</td></tr><tr><td>YUCATÁN</td><td>VALLADOLID</td><td> LICENCIATURA EN FORMACIÓN DOCENTE EN EDUCACIÓN BÁSICA: PATRIMONIO HISTÓRICO Y CULTURAL DE MÉXICO</td><td>310205</td><td>290344</td></tr><tr><td>YUCATÁN</td><td>YAXCABÁ</td><td>INGENIERÍA EN DESARROLLO REGIONAL SUSTENTABLE</td><td>310204</td><td>130306</td></tr><tr><td>ZACATECAS</td><td>GENERAL PÁNFILO NATERA</td><td>INGENIERÍA EN PROCESOS AGROALIMENTARIOS</td><td>320103</td><td>575304</td></tr><tr><td>ZACATECAS</td><td>MAZAPIL</td><td>INGENIERÍA EN MINAS Y MANTENIMIENTO INDUSTRIAL</td><td>320106</td><td>574307</td></tr><tr><td>ZACATECAS</td><td>PINOS</td><td>INGENIERÍA AMBIENTAL PARA LA SUSTENTABILIDAD</td><td>320105</td><td>575303</td></tr></tbody></table></div></div></div>'}
  