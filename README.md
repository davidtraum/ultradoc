
## Document Structure

## Elements

### text
* Aliases: text, t

### image
* Aliases: image, img

### list
* Aliases: list, l

### item
* Aliases: item, i

### table
* Aliases: table

### row

## Example
````
#text {headline,center} My Document
#text {center} By Mister Test

#list
  #item My first list item
  #item My second list item
    #list
      #item And even subitems

Here is some code:
#code [lang=sql]
  SELECT * FROM list WHERE a=2
  DROP TABLE test

A table:
#table
  #header
    #cell My first column
    #cell A second column
  #row
    #Some entries
    #Even more
  #row
    #And a second row
    #With contents

A text with background image:
#container
  #background[image=myimage.png]
  #text {large,center} Wow!

  
#text {small,center} Last modified: %%date, %%time
````