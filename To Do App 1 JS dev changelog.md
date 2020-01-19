
= = = = = = = = = = =

### v1.2.5 - 30.12.2019

- Zmiana Media Query, żeby widok poziomy włączał się już dla ekranów z min-width 960px - będzie obejmował ekrany 10 cali.

- Zmiana wersji językowej na angielską (nazwy buttonów, nazwy dni tygodnia, pytanie o usunięcie całego dnia).

- Przygotowanie plików do udostępnienia w public repo.

= = = = = = = = = = =

### v1.2.4 - 14.11.2019

- Poprawa fn spanEdit - wcześniej zawierała w sobie główną fn nadającą eventListenery (w zapisie IIFE) oraz pozostałe: rozpoczęcie edycji, zakończenie edycji blurem i zakończenie edycji Enterem. Całość była eksportowana do innych plików i tam wywoływana. Zapis IIFE był potrzebny, żeby przy odpaleniu zbiorczej fn wywołać samo nadanie eventListenerów. Podzielono to z powrotem na pojedyncze funkcje, główną nazwano spanEditListeners i wyeksportowano do pozostałych plików.

= = = = = = = = = = =

### v1.2.3 - 13.10.2019

- Dalsza rozbudowa funkcji dragAndDrop() - teraz można też przenosić całe dni. Żeby działanie nie nakładało się na siebie (żeby działało zarówno przenoszenie dni, jak i pojedynczych zadań, żeby nie nakładały się style przy dragover i dragleave i żeby elementy można było przenosić wyłącznie w miejsca, gdzie powinny się znaleźć):
    - zmieniono atrybut data-move na data-task dla taskItems
    - dodano atrybut data-day dla całych dni
    - dodano w odpowiednich miejscach if statements, np.
        - document.querySelector('[data-task]'), które sprawdza, czy istnieje element z takim atrybutem (lub data-day) i wtedy przenoszenie zostanie lub nie zostanie wykonane (m.in. uniemożliwiło to przenoszenie całych dni do taskType__Containers, co wcześniej dawało napis null w danym typie zadania);
        - e.target.classList.contains('day__Container'), które umożliwia przenoszenie dni tylko przez złapanie belki z nazwą dnia;
        - kilku-warunkowy if statement dla drop przy dayContainer, który umożliwia drop dnia po najechaniu na cały kontener lub belkę tytułową lub spanEdit w belce tytułowej.

- Jeśli przenosimy cały dzień na koniec listy, to trafi on na nią jako przedostatni (insertBefore na ostatnim elemencie). Trzeba wtedy przenieść ostatni element o 1 miejsce wstecz, żeby było ok.

- Sprawdzono po raz kolejny, że po zmianach nie zostają żadne stare/zbędne/dodatkowe fragmenty kodu w pliku z kopią zapasową.

= = = = = = = = = = =

### v1.2.2 - 12.10.2019

- Rozbudowano funkcję dragAndDrop() - teraz można ustawiać elementy na liście w dowolnej kolejności. Po złapaniu zadania i przeciągnięciu go na inne zadanie, jest ono dodawane na jego miejscu, i cała lista przesuwa się w dół. Jednocześnie zachowano możliwość dodawania zadań do pustych list - dodane if statement przy drop dla taskTypeContainer, które pozwala na append tylko jeśli kategoria zadań jest pusta, w innym przypadku stosowane jest insertBefore stosowane przy taskItems. Bez if statement zadania zawsze były dodawane na końcu listy. Zmieniono też dodawanie atrybutu style z eventu dragenter na dragover -> dla taskTypeContainer działało ok, ale przy itemach style działały tylko przy dragenter, a przy każdym poruszeniu myszą (nawet na tym samym elemencie) znikały lub migały. Dragover odpala się częściej, ale daje wrażenie, jakby element cały czas miał zmieniony styl aż do drop lub dragleave. Throttle z lodash nie działało.

- Można odnieść wrażenie, że przy przenoszeniu elementów z dołu na górę pojawiają się one w miejscach, które wskażemy, a jeśli przenosimy z góry na dół, wtedy pojawiają się nad elementem, który wskażemy. Wszystko jest ok. Po prostu w obu przypadkach lista się przesuwa, a jeśli przesuwamy coś z góry na dół, to ten element znika z góry i całość przesuwa się o 1 miejsce do góry, przez co można odnieść wrażenie, że element pojawił się o 1 miejsce wyżej niż chcieliśmy.

= = = = = = = = = = =

### v1.2.1 - 06.10.2019, 07.10.2019, 08.10.2019, 09.10.2019

- Wydzielono funkcję spanEdit() jako ES6 Module.

- Z uwagi na to, że js type="module" ma module-scope dla zmiennych i funkcji, przestały działać wszystkie onclicki z HTMLa. Konieczne był refactor kodu, żeby dodać eventListenery dla głównych buttonów (dodanie dnia, zapisanie do pliku, wczytanie pliku - tutaj nieco więcej kombinacji, bo działał tylko raz). Dopiero później znaleziono info, że można było ustawić to wszystko dla window i wtedy onclicki by znowu działały. Tutaj już zostaje wersja z eventListenerami.

- Użyto Webpacka (domyślne ustawienia), żeby zbundlować oba pliki js w jeden i żeby wszystko działało offline. Konieczna była zmiana nazwy toDoApp.js na index.js, żeby Webpack zadziałał bez konfiguracji.

- Zmieniono strukturę folderów projektu, głównie po to, aby móc korzystać z Webpacka: folder src (source code) z podzielonymi plikami oraz folder dist (distribution) z plikami, które służą jako production code (może być tam kod np. zminifikowany, zbundlowany itp.).

- Wydzielono plik spanEdit.css ze stylami dla modułu spanEdit.

- Wydzielono funckję dragScroll() jako ES6 Module. Konieczna była zmiana let isDown na obiekt click, który zawiera mousedown = true/false. Zmienna isDown była używana w funkcji dragAndDrop, żeby przy jej zakończeniu ekran nie przenosił się w różne miejsca i żeby nie można było używać drag scrolla bez trzymania przycisku myszy. Zmiana na obiekt była konieczna, ponieważ przy imporcie zmiennej zmienia się ona w const i nie można było jej ustawić jako true/false. Z kolei zawartość obiektu może być zmieniana.

- Wydzielono funkcję dragAndDrop() jako ES6 Module.

- Wydzielono funkcję saveToFile() jako ES6 Module.

- Wydzielono funkcję loadFromFile() jako ES6 Module.

- Wydzielono funkcje związane z dodawaniem, usuwaniem, prio i progress tasków jako ES6 Module.

- Wydzielono funkcję odpowiedzialne za local storage save and load jako ES6 Module.

- Zmiana w funkcjach save&load LS i File z innerHTML body na innerHTML diva mainContainer. Dzięki temu zarówno w LS, jak i w pliku z kopią zapasową będzie tylko kod listy zadań bez górnych buttonów oraz jakichkolwiek innych fragmentów kodu (np. podłączonych skryptów).

- Zmiana w funkcji loadFromLS - rozdzielenie eventListenera od głównej funkcji oraz dodanie dodatkowych dwóch linii, które czyszczą plik z inputa, aby można było wczytać kolejny raz ten sam plik bez przeładowania strony.

- Sprawdzono po raz kolejny, że po zmianach nie zostają żadne stare/zbędne/dodatkowe fragmenty kodu w pliku z kopią zapasową.

= = = = = = = = = = =

### v1.1.0 - 05.10.2019, 06.10.2019

- Dodano span oraz input z odpowiednimi klasami do .day__dateBar, aby można było edytować belkę z nazwą dnia tak jak edytuje się treść zadania.

- Zmieniono funkcję edycji zadania w taki sposób, aby można jej było użyć bardziej uniwersalnie (np. jako moduł):
    - Zmiana (3 wystąpienia w JS i 2 w CSS) klasy editOnClass na spanEdit;
    - Zmiana (3 wystąpienia w JS i 2 w CSS) klasy editTaskInput na editableInput;
    - Zmiana (3 wystąpienia w JS) nazwy fn editTask na spanEdit;
    - Zmiana (4 wystąpienia w JS) nazwy fn updateTask na updateSpan;
    - Zmiana (1 wystąpienie w CSS) taskItem span na .editableSpan oraz tak samo dla hover;
    - Usunięcie marginu z .day__dateBar, bo wykluczał się z powyższym;
    - Dodanie klasy editableSpan do spanów, które można edytować;
    - Zmiana w fn spanEdit querySelectorAll z '.taskItem span' na '.editableSpan';
    - W fn showInput zmiana querySelector z 'input[type=text]' na '.editableInput'.

= = = = = = = = = = =

### v1.0.8 - 03.10.2019, 04.10.2019

- Dodano funckję dragScroll, dzięki której można przewijać ekran trzymając wciśnięty LPM (na podstawie https://codepen.io/toddwebdev/pen/yExKoj).
    - Zmienną isDown odpowiedzialną za uruchomienie funkcji wyciągnięto poza funkcję i dodano także do drag&drop jako false, ponieważ przy przeciąganiu elementu między listami ekran zaczynał skakać. Teraz drag&drop oraz dragScroll działają prawidłowo, czyli uruchamia się tylko jedna funkcja w zależności od tego, gdzie kliknięto i przytrzymano LPM.
    - Początkowo zadziałało dopiero przypisanie funkcji do elementu html i czasem lagowała przy scrollowaniu. Wystarczyło dać overflow-x: auto do main i do niego przypisać funkcję.
    - Funkcja składa się z kilku zmiennych: wspomniana wyżej zmienna isDown (wskazuje, czy trzymamy przycisk myszy i tylko wtedy fn jest wykonywana), startX oraz scrollLeft. Przy kliknięciu zmienna startX otrzymuje wartość e.pageX (miejsce, gdzie kliknięto) minus main.offsetLeft (odległość od krawędzi -> w przypadku Chrome był brany tylko margin-left z body, który wynosił zawsze 8px), a zmienna scrollLeft otrzymuje taką wartość, o ile już przescrollowano od lewej do momentu kliknięcia wywołującego funkcję (początkowo jest 0, jeśli jeszcze nie scrollowano). W momencie ruchu myszą podczas trzymania przycisku wykonywana jest dalsza część funkcji, która zawiera kolejne zmienne: x, która wynosi e.pageX (pozycja kursora aktualizowana przy każdym przesunięciu myszy) minus main.offsetLeft oraz zmienna walk, która wynosi x minus startX (wyliczone w momencie kliknięcia). W takiej formie przewijanie jest powolne, więc można pomnożyć walk przez 2 lub 3, żeby je przyspieszyć. Ostatnia rzecz to ustawienie main.scrollLeft przez odjęcie walk od pobranego w momencie kliknięcia scrollLeft.
    (INFO: aby sprawdzić, jak to działa, jeśli element ma scrolla, to można w konsoli przypisać go do zmiennej i potem użyć metody scrollLeft i przypisać mu jakąś wartość, np. element.scrollLeft = 100 -> wtedy scroll przeskoczy do tej pozycji).

= = = = = = = = = = =

### v1.0.6 - 02.10.2019

- Przy dodawaniu zadania od razu pojawia się input z focusem i możliwością wpisania do niego tekstu.

- Puste kategorie zadań nie mają już określonej wysokości, więc jeśli w kategorii "Strona" nie będzie zadań, to nie będzie większego odstępu między nią a kategorią "Zadania". Aby umożliwić przeniesienie tam zadania, przy dragenter jest dodawany dodatkowy styl, który daje min-height: 100px.

= = = = = = = = = = =

### v1.0.5 - 01.10.2019

- Zmiana wyglądu całości na horizontal scroll. Wyszło podobnie do Trello. Jeśli konkretny dzień ma więcej zadań niż jest pionowego miejsca na stronie, to pojawia się pionowy scroll przy konkretnym dniu. Jeśli jest więcej dni niż poziomego miejsca na stronie, wtedy pojawia się poziomy scroll dla całości. Main Controls zostają na miejscu. Są też odpowiednie MQ, żeby był odpowiedni layout na mniejszych ekranach.

- Dodano kodowanie znaków UTF-8 dla pliku z kopią zapasową.

- Ostylowanie scrollbara dla Chrome i FF.

= = = = = = = = = = =

### v1.0.2 - 26.09.2019

- Wydzielono Media Queries do oddzielnego pliku css.

- Ustawiono nowe reguły dla mniejszych ekranów dla mainControls - wyświetlanie w kolumnie przy takiej szerokości ekranu, gdzie nie wszystkie buttony mogłyby być w jednej linii.

= = = = = = = = = = =

### v1.0.1 - 25.09.2019

- Zmieniono kolorystykę.

- Dodano confirm przy usuwaniu dnia, ponieważ istniało ryzyko kliknięcia przycisku usuwającego dzień, który jest bardzo blisko dodawania zadania dla drugiej kategorii. Jeśli zostanie to w tej postaci, to kiedyś można użyć innej metody i dać jakiegoś customowego boxa z pytaniem, czy usunąć dzień.

= = = = = = = = = = =

### v1.0.0 - 20.09.2019

- Zmieniono układ całości usuwając kategorie zadań: prio i mniej ważne. Zostały tylko zadania i strona z układem dostosowującym się do ekranu - na największym jest 1 dzień w rzędzie + 1 kolumna na zadania i 1 kolumna na stronę, a w każdej z nich zadania układają się po dwa w rzędzie.

- Dodano klasy, funkcję i element prioBtn, żeby oznaczać zadania jako priorytetowe. InProgressBtn ma pierwszeństwo, tzn. po włączeniu tego statusu, trzeba go wyłączyć, żeby zobaczyć kolor prio - kolor nie będzie się zmieniał przy używaniu raz prio, a raz inProgress.

- Przeniesiono css buttonów do oddzielnego pliku buttons.css.

- Przetestowano po raz kolejny, że w zapisanych plikach nie ma żadnych pozostałości po poprzednich dniach/zadaniach ani przenoszonych zadaniach z miejsca na miejsce.

- Zmieniono atrybut data-move na pusty string, a w setData (dla FF) this.dataset.move na this.dataset. Nadal wszystko działa.

= = = = = = = = = = =

### v0.9.6 - 18.09.2019, 19.09.2019

- Poprawiono i skrócono funkcję Drag&Drop:
    - Nie opiera się ona już na display:none elementów usuwanych oraz podpinaniu ich pod zmienną.
    - Nie udało się wykorzystać DataTransfer -> na większości przykładów, które znaleziono w internecie było to potrzebne do tego, żeby zapisać w tym np. id elementu, a potem przy evencie drop wyciągnąć stamtąd id i zrobić appendChild do miejsca, do którego zostaje przenoszony element.
    - Tutaj z kolei ustawiono to w ten sposób, że przy drag element dostaje data-attribute -> data-move, 'true'. Za pomocą querySelector jest potem łapany po tym atrybucie i dodawany do nowego miejsca. Przy evencie dragend atrybut jest czyszczony.
    - Nadal nie działa w Firefoxie.

- Funkcja Drag&Drop działa już też w Firefoxie. Wystarczyło tylko dodać e.dataTransfer.setData('text', this.dataset.move) do eventu dragstart, żeby można było przenosić elementy. Nie było nawet potrzebne getData, tylko dalej mogło być append na podstawie złapania elementu przez data attribute. Do eventu drop trzeba było dać preventDefault, żeby FF nie próbował otwierać przenoszonych elementów jako linków.

- Dodano funkcję makeElInteractive(), na którą składa się 5 innych funkcji nadających działanie poszczególnym elementom strony. Te 5 funkcji powtarzało się w 3 miejscach strony = 15 linijek kodu -> teraz jest 10 (7 funkcja z klamrami + 3 razy wrzucona w kodzie).

- this.closest('.nazwaKlasy') zamiast parentElement.parentElement.

= = = = = = = = = = =

### v0.9.5 - 16.09.2019

- Dodano funkcję do obsługi eventów Drag&Drop.
    - W pierwszej wersji opierającej się na pętlach for po podpięciu funkcji zaczęły generować się null i undefined przy przenoszeniu elementów. Wystarczyło przenieść poza funkcję główną zmienną, która miała przechowywać przenoszony element.
    - Spróbowano też gorszej metody z podzieleniem tego na funkcje, które były podłączane pod odpowiednie eventy w HTMLu (dodatkowe atrybuty w template stringu), ale po pierwsze eventy całkowicie straciły kontekst i nie do końca działały jak powinny oraz były generowane w takich ilościach, że po chwili wszystko się zawieszało.
    
- Funkcja została wrzucona w odpowiednie miejsca, aby wszystkie taski miały obsługę drag&drop: w funkcji addDay(), addTask(), window.onload oraz tasksFromFile().

- Dodano także saveToLS() do eventu dragend, dzięki czemu każde przeniesienie zadania od razu zapisuje się w LS.

= = = = = = = = = = =

### v0.9.0 - 12.09.2019, 14.09.2019, 15.09.2019

- Dodano funkcje do zapisywania tagu body do pliku .txt i wczytywania go na stronę: tasksBackup() oraz tasksFromFile(input).
    - Pierwsza opiera się na zapisaniu tych samych danych, które zapisują się w LS jako Blob (Binary Large Object). Następnie jest tworzony link do Bloba, który jest podstawiany pod nowy link z atrybutem download. Zostaje zasymulowane kliknięcie, plik można pobrać, a następnie link zostaje usunięty, żeby nie zalegał w pamięci.
    - Druga używa FileReadera, żeby odczytać zawartość pliku tekstowego, łapie tag body i wstawia mu jako innerHTML zawartość pliku. Nie jest to rozwiązanie idealne, bo wystarczy wczytać jakikolwiek inny plik, żeby wywalić stronę. Wczytany plik zostanie zapisany w LS dopiero po dokonaniu jakiejkolwiek zmiany na liście, która odpala się saveToLS(). Dlatego przy przypadkowym wywaleniu strony wystarczy ją odświeżyć, żeby odzyskać to co było przed wczytaniem pliku.

- Dodano stylowanie input[type=file] - wszystko wydawało się działać w porządku, gdy input dostał display:none - można było ostylować label i po kliknięciu odpalało się wczytywanie pliku. Nie można było jednak złapać focusa za pomocą TAB i użyć "buttona" za pomocą SPACE.
    - Nadano inputowi opacity: 0 i za pomocą input[type=file]:focus + button ("+" łapie element następny po wskazanym) ustawiono domyślny outline dla buttona w momencie focusa na niewidzialnym inpucie, a to powinno nastąpić po wciśnięciu TAB mając focus na buttonie Save to File.
    - Label trzeba było złapać w tagi <button>, ponieważ label wyświetlało napis jako inny font (lub inną wielkość i grubość fonta, której nie dało się dopasować do pozostałych elementów), a teraz wygląda to spójnie. Dodatkowo input dostał position:absolute, żeby go ustawić zaraz za divem mainControls, któremu nadano position: relative. Ponadto input dostał wymiary 0.1x0.1px, bo mimo wszystko pojawia się w layoucie, a tak nie powinien przeszkadzać.
    - Firefox miał jakieś swoje domyślne dziwne outline'y (kropkowane wewnątrz inputów) i w przeciwieństwie do Chrome nadal nie łapał focusa. Ustawiono @-moz-document url-prefix() i wyłączono dziwny focus oraz ustawiono podobny do Chrome - teraz działa jak powinno.
    - Na koniec ustawiono tabIndex="-1" dla tagu <button>, ponieważ w Chrome jeden TAB dawał focus na load button i można było go użyć, kolejny TAB nadal zostawiał focus na tym elemencie i po użyciu nic się nie działo. To wykluczyło drugi focus i wszystko działa jak należy.

- Poprawiono funkcję zapisującą dane do pliku tasksBackup(). Działała tylko w Chrome. Dla Firefoxa trzeba było dodać jeszcze document.body.appendChild(downloadLink) oraz document.body.removeChild(downloadLink).

= = = = = = = = = = =

### v0.8.6 - 11.09.2019

- Dodano auto-save przy każdej akcji (dodawanie/usuwanie dni, zadań, aktualizacja zadań, zmiana In Progress).

- Dodano funkcję loadFromLS() do window.onload, dzięki czemu aktualne dane widać cały czas przy każdy odświeżeniu lub otwarciu strony.

- Poprawione stylowanie:
    - dla największego ekranu zadania były pozycjonowanie do lewej, a nie do środka;
    - zmieniono position: absolute buttonów removeTask i inProgress na flex;
    - dodano min-height: 20px dla span -> jeśli zostanie wyczyszczona treść zadania, to można kliknąć w puste pole, żeby pojawił się input

= = = = = = = = = = =

### v0.8.5 - 10.09.2019

- Zmiana układu zadań - dodanie kilku Media Queries, żeby przetestować wygląd na różnych szerokościach ekranu. Dla dużych ekranów wersja, gdzie kategorie zadań nie są jedna pod drugą, ale obok siebie. Przy dwóch kolumnach (2 dni obok siebie) wygląda to nieźle, ale jest mała szerokość pola na treść zadania, więc zadania z dużą ilością tekstu mogą być długie. Z kolei widok z jednym dniem na całej szerokości strony też wydaje się niezły, ale jeśli zadania będą tylko w jednej kategorii, to może to ostatecznie średnio wyglądać.

- Usunięto background dla .day__Container i teraz jeszcze lepiej to wygląda, jeśli jest dużo pustego miejsca (nie rzuca się ono w oczy, gdy nie widać dokładnie gdzie cały box się zaczyna i kończy).

= = = = = = = = = = =

### v0.8.0 - 09.09.2019

- Dodane buttony, żeby zapisywać cały kod HTML sekcji body do Local Storage i potem wczytywać go, żeby odzyskać wszystkie elementy, jakie były przy zapisie:
    - Najpierw nie działał button dodawania dnia po załadowaniu danych z Local Storage - żeby to naprawić, przeniesiono ogólną zmienną łapiącą mainContainer do funkcji dodającej dni.
    - Potem okazało się, że nie działają buttony w nowych dniach dodanych po załadowaniu danych z Local Storage - konieczne było dodanie części funkcji do innych, aby były nadawane eventListenery dla nowych elementów. I tak np. przy tworzeniu nowego dnia odpalana jest funkcja związana z usunięciem dnia oraz dodaniem zadania w tym dniu, a przy dodaniu zadania odpalana jest funkcja związana z edycją zadania, nadaniem klasy In Progress oraz usunięciem zadania.
    - Rozwiązanie wydaje się dobre, ponieważ zapisuje wszystkie dane, jakie mamy na stronie i brak aktualnie pomysłu, jak można każdy dzień przerobić na obiekt, który można by było dodać osobno do LS i potem przywrócić, żeby wszystko było tak samo (kolejność dni, kolejność zadań, status zadań - In Progress lub nie)
    - Jednocześnie minus jest taki, że jeśli wykonywane będą jakieś zmiany związane z dodawaniem nowych klas lub usuwaniem starych, to będzie to miało zastosowanie tylko dla nowych elementów i trzeba też pamiętać, aby wszystkie zmiany wprowadzać w template stringach w JSie.

- Dodano if statement do loadFromLS(), aby działa tylko wtedy, gdy w LS jest jest zapisana lista.

- Dodany Google Font: Lato.

- Zmieniona kolorystyka.

- Odwrotna kolejność: najpierw buttony do inProgress i usunięcia zadania, a potem span / input z treścią zadania. Poprawione funkcje, aby działały właściwie po zmianie.

= = = = = = = = = = =

### v0.6.0 - 08.09.2019

- Dodane buttony i funkcje do nich:
    - dodawanie zadań w poszczególnych kategoriach zadań w wybranym dniu;
    - usuwanie wybranego dnia;
    - usuwanie konkretnego zadania;
    - zmiana koloru zadania na żółty jako oznaczenie In Progress;

- Dodano funkcje odpowiedzialne za zmianę treści zadania:
    - po kliknięciu na span jest pobierany jego innerText i podstawiany jako value inputa, który pojawia się zamiast spana - można w nim wpisać treść zadania;
    - po wprowadzeniu zmian można kliknąć gdziekolwiek lub wcisnąć enter i wtedy jest pobierana value inputa i podstawiana jako innerText span, który pojawia się z powrotem, a input znika.

- Dodano scale taskItems przy hover.

- Dodano Media Query, żeby powiększyć boxy dni na ekranach szerszych niż 340px.

- Drobne poprawki wyglądu.

= = = = = = = = = = =

### v0.2.0 - 07.09.2019:

- Stworzony prototyp wyglądu listy zadań - mały ekran jedna kolumna i w miarę rozszerzania ekranu kolejne dni pojawiają się obok siebie.

- Pod głównym elementem, w którym mają pojawiać się zadania stworzono wizualizację diva z dniem i zadaniami i na nim bazowano pisząc funkcję w JSie.

- Stworzona funkcja dodawania kolejnych dni na podstawie inputa z datą - dane z inputa są używane do wpisania daty i dnia tygodnia w nowym elemencie.

- Funkcja dodawania dni w dwóch wersjach:
    - Jedna na podstawie createElement, appendChild, classList.add, setAttribute itp. - markup trochę się rozrasta, więc są tworzone nowe elementy, dodawane są im klasy i atrybuty, potem one są dodawane jako dzieci innych elementów i dopiero z tego powstaje pełny div dla danego dnia.
    - Druga to zmienna z template stringiem zawierającym skopiowany markup dla całego diva z konkretnym dniem i podstawiona do użycia zmienna odpowiadająca za datę i dzień tygodnia. Całość jest wstawiana do pustego diva za pomocą innerHTML.
Obie metody to podobna ilość kodu (35 vs 37 linijek), z czego druga wydaje się prostsza, bo można skopiować kod z pliku HTML i mieć pewność, że wszystkie elementy będą na swoich miejscach. W przypadku pierwszej metody jest zdecydowanie więcej kombinowania, jeśli zmieniałby się markup. 

#################################

UWAGI:

- (Skopiowane z changeloga) Funkcja wczytywania danych z pliku używa FileReadera, żeby odczytać zawartość pliku tekstowego, łapie tag body i wstawia mu jako innerHTML zawartość pliku. Nie jest to rozwiązanie idealne, bo wystarczy wczytać jakikolwiek inny plik, żeby wywalić stronę. Wczytany plik zostanie zapisany w LS dopiero po dokonaniu jakiejkolwiek zmiany na liście, która odpala saveToLS(). Dlatego przy przypadkowym wywaleniu strony wystarczy ją odświeżyć, żeby odzyskać to co było przed wczytaniem pliku.

- Nie dodawano dodatkowych funkcji, żeby można było układać elementy na konkretnej liście, np. przesuwanie góra/dół. Wystarczy złapać dowolny element, lekko go przesunąć i puścić i znajdzie się on na końcu danej listy. W ten sposób przekaładając kilka elementów można je ułożyć w odpowiedni sposób.

#################################

MOŻE KIEDYŚ:

0. Dalsza zmiana wyglądu:
-> można dać okrągły button z plusem w środku, który będzie umieszczony w prawym dolnym rogu ekranu i będzie służył do dodawania nowej listy zadań (position: fixed i z-index). Po kliknięciu pojawiałby się nowy ekran - byłby to wcześniej przygotowany box w HTMLu z inputem do wprowadzenia nazwy zadania oraz buttonem do akceptacji i anulowania (z-index + full width and height + ciemne tło z jakimś opacity). Po wprowadzeniu nazwy i akceptacji zostałaby dodana nowa lista z taką nazwą i box dostałby ponownie display: none. Przy anulacji byłoby samo display: none.
Można spróbować wykorzystać <dialog> element:
https://css-tricks.com/some-hands-on-with-the-html-dialog-element/
