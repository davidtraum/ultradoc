
> Hint: Early state of development. A more detailed documentation will follow.

## Functional document markup
* Lists
* Tables
* Images
* Layouts
* Code Highlighting
* Math

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
    