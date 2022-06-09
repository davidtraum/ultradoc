
> Hint: Early state of development. A more detailed documentation will follow.

## Installation

Required software: git, deno, npm

1. Clone the repository using `git clone https://github.com/davidtraum/ultradoc`
2. Enter the directory using `cd ultradoc`
3. Install using `npm run install`
4. UltraDoc is now available systemwide using the `udoc` command

## Functional document markup
* Lists
* Tables
* Images
* Layouts
* Code Highlighting (using highlight.js)
* UML Diagrams (using PlantUML)
* Easy font loading (using Google Fonts)

## Examples

Simple List:
````
#list
  #ítem Some
  #item List
  #item {red, bold} Important
    #list
      #item Sublist
````

Syntax highlighting (using highlight.js)
````
#code [lang=sql]
SELECT * FROM myTable WHERE a = 2
DROP TABLE myTable
````

Table
````
#table {centered}
  #header
    #cell {bold} First Column
    #cell Second column
  #row
    #cell Some data
    #cell More data
  #row
    #cell
      #list [ordered]
        #item Nested list
        #item Works fine
    #cell Cell item
````
    
