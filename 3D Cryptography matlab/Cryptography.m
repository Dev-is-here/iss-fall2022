clc;
clear all;
close all;
z1=[ 1,0,1;1,0,1;1,0,1];
y1=[ 1,0,1;1,0,1;1,0,1];
z1=z1+y1;



%part 1
k=1;
m=1;
for i=1:3
  
    for j=1:3
        x1(i,j,k)=z1(i,j);
    end;
k=k+1;
end;

for i=1:3
    for j=1:3
        for k=1:3           
          
            b(m)=x1(i,j,k);
            m=m+1;
        end;
    end;
end;

%generate ds
a = randperm(27,27);

%generate address ds matrix
m=1;
for i=1:3
    for j=1:3
        for k=1:3           
            x(i,j,k)=a(m);
           
            m=m+1;
        end;
    end;
end;

%encryption
for i=1:3
    for j=1:3
        for k=1:3
            %storing address encryption ds in m
            m=x(i,j,k);
           
            encmtrx(i,j,k)=b(m);
           
        end;
    end;
end;

%decryption
for i=1:3
    for j=1:3
        for k=1:3           
            m=x(i,j,k);
            c(m)=encmtrx(i,j,k);
           
        end;
    end;
end;

%resultant array c must match original string b
%putting resultant array in cube
%resultant cube ogmtrx must match x1 original matrix
m=1;
for i=1:3
    for j=1:3
        for k=1:3           
            ogmtrx(i,j,k)=c(m);
            m=m+1;
        end;
    end;
end;
